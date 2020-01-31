import { Component, NgZone } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  Events,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Platform,
  ViewController
} from 'ionic-angular';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

// providers
import { AddressBookProvider } from '../../providers/address-book/address-book';
import { BwcErrorProvider } from '../../providers/bwc-error/bwc-error';
import { CurrencyProvider } from '../../providers/currency/currency';
import { ExternalLinkProvider } from '../../providers/external-link/external-link';
import { GiftCardProvider } from '../../providers/gift-card/gift-card';
import { CardConfigMap } from '../../providers/gift-card/gift-card.types';
import { ActionSheetProvider } from '../../providers/index';
import { Logger } from '../../providers/logger/logger';
import { OnGoingProcessProvider } from '../../providers/on-going-process/on-going-process';
import { PlatformProvider } from '../../providers/platform/platform';
import { ProfileProvider } from '../../providers/profile/profile';
import { TimeProvider } from '../../providers/time/time';
import { WalletProvider } from '../../providers/wallet/wallet';

// pages
import { TxDetailsModal } from '../../pages/tx-details/tx-details';
import { SearchTxModalPage } from './search-tx-modal/search-tx-modal';
import { WalletBalanceModal } from './wallet-balance/wallet-balance';

const HISTORY_SHOW_LIMIT = 10;
const MIN_UPDATE_TIME = 2000;
const TIMEOUT_FOR_REFRESHER = 1000;
interface UpdateWalletOptsI {
  walletId: string;
  force?: boolean;
  alsoUpdateHistory?: boolean;
}

@IonicPage()
@Component({
  selector: 'page-wallet-details',
  templateUrl: 'wallet-details.html'
})
export class WalletDetailsPage {
  private currentPage: number = 0;
  private showBackupNeededMsg: boolean = true;
  private onResumeSubscription: Subscription;
  private analyzeUtxosDone: boolean;
  private zone;

  public requiresMultipleSignatures: boolean;
  public wallet;
  public history = [];
  public groupedHistory = [];
  public walletNotRegistered: boolean;
  public updateError: boolean;
  public updateStatusError;
  public updatingStatus: boolean;
  public updatingTxHistory: boolean;
  public updateTxHistoryError: boolean;
  public updatingTxHistoryProgress: number = 0;
  public showNoTransactionsYetMsg: boolean;
  public showBalanceButton: boolean = false;
  public addressbook = {};
  public txps = [];
  public txpsPending: any[];
  public lowUtxosWarning: boolean;
  public associatedWallet: string;
  public showShareButton: boolean;

  public supportedCards: Promise<CardConfigMap>;

  constructor(
    private currencyProvider: CurrencyProvider,
    private navParams: NavParams,
    private navCtrl: NavController,
    private walletProvider: WalletProvider,
    private addressbookProvider: AddressBookProvider,
    private events: Events,
    public giftCardProvider: GiftCardProvider,
    private logger: Logger,
    private timeProvider: TimeProvider,
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private onGoingProcessProvider: OnGoingProcessProvider,
    private externalLinkProvider: ExternalLinkProvider,
    private actionSheetProvider: ActionSheetProvider,
    private platform: Platform,
    private profileProvider: ProfileProvider,
    private viewCtrl: ViewController,
    private platformProvider: PlatformProvider,
    private statusBar: StatusBar,
    private socialSharing: SocialSharing,
    private bwcErrorProvider: BwcErrorProvider
  ) {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.showShareButton = this.platformProvider.isCordova;
  }

  ionViewDidLoad() {
    this.wallet = this.profileProvider.getWallet(this.navParams.data.walletId);
    // Getting info from cache
    if (this.navParams.data.clearCache) {
      this.clearHistoryCache();
    } else {
      if (this.wallet.completeHistory) this.showHistory();
      else
        this.fetchTxHistory({
          walletId: this.wallet.credentials.walletId,
          force: true
        });
    }

    this.requiresMultipleSignatures = this.wallet.credentials.m > 1;
    this.supportedCards = this.giftCardProvider.getSupportedCardMap();

    this.addressbookProvider
      .list()
      .then(ab => {
        this.addressbook = ab;
      })
      .catch(err => {
        this.logger.error(err);
      });
  }

  subscribeEvents() {
    this.events.subscribe('Local/WalletUpdate', this.updateStatus);
    this.events.subscribe('Local/WalletHistoryUpdate', this.updateHistory);
  }

  // Event handling
  ionViewWillLoad() {
    this.subscribeEvents();
  }

  ionViewWillEnter() {
    if (this.platformProvider.isIOS) {
      this.statusBar.styleLightContent();
    }
    this.onResumeSubscription = this.platform.resume.subscribe(() => {
      this.profileProvider.setFastRefresh(this.wallet);
      this.subscribeEvents();
    });
  }

  ionViewWillLeave() {
    if (this.platformProvider.isIOS) {
      this.statusBar.styleDefault();
    }
  }

  // Start by firing a walletFocus event.
  ionViewDidEnter() {
    this.profileProvider.setFastRefresh(this.wallet);
    this.events.publish('Local/WalletFocus', {
      walletId: this.wallet.credentials.walletId
    });
  }

  ionViewWillUnload() {
    this.profileProvider.setSlowRefresh(this.wallet);
    this.events.unsubscribe('Local/WalletUpdate', this.updateStatus);
    this.events.unsubscribe('Local/WalletHistoryUpdate', this.updateHistory);
    this.onResumeSubscription.unsubscribe();
  }

  shouldShowZeroState() {
    return this.showNoTransactionsYetMsg && !this.updateStatusError;
  }

  shouldShowSpinner() {
    return (
      (this.updatingStatus || this.updatingTxHistory) &&
      !this.walletNotRegistered &&
      !this.updateStatusError &&
      !this.updateTxHistoryError
    );
  }

  private fetchTxHistory(opts: UpdateWalletOptsI) {
    if (!opts.walletId) {
      this.logger.error('Error no walletId in update History');
      return;
    }

    const progressFn = ((_, newTxs) => {
      let args = {
        walletId: opts.walletId,
        finished: false,
        progress: newTxs
      };
      this.events.publish('Local/WalletHistoryUpdate', args);
    }).bind(this);

    // Fire a startup event, to allow UI to show the spinner
    this.events.publish('Local/WalletHistoryUpdate', {
      walletId: opts.walletId,
      finished: false
    });
    this.walletProvider
      .fetchTxHistory(this.wallet, progressFn, opts)
      .then(txHistory => {
        this.wallet.completeHistory = txHistory;
        this.events.publish('Local/WalletHistoryUpdate', {
          walletId: opts.walletId,
          finished: true
        });
      })
      .catch(err => {
        if (err != 'HISTORY_IN_PROGRESS') {
          this.logger.warn('WalletHistoryUpdate ERROR', err);
          this.events.publish('Local/WalletHistoryUpdate', {
            walletId: opts.walletId,
            finished: false,
            error: err
          });
        }
      });
  }

  public isUtxoCoin(): boolean {
    return this.currencyProvider.isUtxoCoin(this.wallet.coin);
  }

  private clearHistoryCache() {
    this.history = [];
    this.currentPage = 0;
  }

  private groupHistory(history) {
    return history.reduce((groups, tx, txInd) => {
      this.isFirstInGroup(txInd)
        ? groups.push([tx])
        : groups[groups.length - 1].push(tx);
      return groups;
    }, []);
  }

  private showHistory(loading?: boolean) {
    if (!this.wallet.completeHistory) return;

    this.history = this.wallet.completeHistory.slice(
      0,
      (this.currentPage + 1) * HISTORY_SHOW_LIMIT
    );
    this.zone.run(() => {
      this.groupedHistory = this.groupHistory(this.history);
    });
    if (loading) this.currentPage++;
  }

  private setPendingTxps(txps) {
    this.txps = !txps ? [] : _.sortBy(txps, 'createdOn').reverse();
    this.txpsPending = [];

    this.txps.forEach(txp => {
      const action = _.find(txp.actions, {
        copayerId: txp.wallet.copayerId
      });

      if (!action && txp.status == 'pending') {
        this.txpsPending.push(txp);
      }

      // For unsent transactions
      if (action && txp.status == 'accepted') {
        this.txpsPending.push(txp);
      }
    });
  }

  public openProposalsNotificationsPage(): void {
    this.navCtrl.push('ProposalsNotificationsPage', {
      walletId: this.wallet.id
    });
  }

  private updateAll = _.debounce(
    (opts?) => {
      opts = opts || {};
      this.events.publish('Local/WalletFocus', {
        walletId: this.wallet.credentials.walletId,
        force: true
      });
    },
    MIN_UPDATE_TIME,
    {
      leading: true
    }
  );

  public toggleBalance() {
    this.profileProvider.toggleHideBalanceFlag(
      this.wallet.credentials.walletId
    );
  }

  public loadHistory(loading) {
    if (
      this.history &&
      this.wallet.completeHistory &&
      this.history.length === this.wallet.completeHistory.length
    ) {
      loading.complete();
      return;
    }
    setTimeout(() => {
      this.showHistory(true); // loading in true
      loading.complete();
    }, 300);
  }

  private analyzeUtxos(): void {
    if (this.analyzeUtxosDone) return;

    this.walletProvider
      .getLowUtxos(this.wallet)
      .then(resp => {
        if (!resp) return;
        this.analyzeUtxosDone = true;
        this.lowUtxosWarning = !!resp.warning;
        // this.logger.debug('Low UTXOs warning: ', this.lowUtxosWarning);
      })
      .catch(err => {
        this.logger.warn('Analyze UTXOs: ', err);
      });
  }

  // no network //
  private updateHistory = opts => {
    this.logger.debug('RECV Local/WalletHistoryUpdate @walletDetails', opts);
    if (opts.walletId != this.wallet.id) return;

    if (opts.finished) {
      this.updatingTxHistoryProgress = 0;
      this.updatingTxHistory = false;
      this.updateTxHistoryError = false;

      const hasTx = !!this.wallet.completeHistory[0];

      this.showNoTransactionsYetMsg = !hasTx;

      if (this.wallet.needsBackup && hasTx && this.showBackupNeededMsg)
        this.openBackupModal();

      this.showHistory();
    } else {
      if (opts.error) {
        this.updatingTxHistory = false;
        this.updateTxHistoryError = true;

        // show what we have.
        this.showHistory();
      } else {
        this.updatingTxHistory = true;
        this.updatingTxHistoryProgress = opts.progress;
        this.updateTxHistoryError = false;

        // show what we have
        this.showHistory();

        // Hide prev history if long downlad is happending...
        //  if (opts.progress > 5) {
        //  this.history = null;
        //  }
      }
    }
  };

  // no network //
  private updateStatus = opts => {
    if (opts.walletId != this.wallet.id) return;
    this.logger.debug('RECV Local/WalletUpdate @walletDetails', opts);

    if (!opts.finished) {
      this.updatingStatus = true;
      return;
    }

    this.updatingStatus = false;

    if (!this.wallet.error) {
      this.logger.debug(
        ' Updating wallet with amount ',
        this.wallet.cachedStatus.balance.totalAmount
      );
      let status = this.wallet.cachedStatus;
      this.setPendingTxps(status.pendingTxps);
      this.showBalanceButton = status.totalBalanceSat != status.spendableAmount;

      const minXrpBalance = 20000000; // 20 XRP * 1e6
      if (this.wallet.coin === 'xrp') {
        this.showBalanceButton =
          status.totalBalanceSat &&
          status.totalBalanceSat != status.spendableAmount + minXrpBalance;
      }

      if (this.isUtxoCoin()) {
        this.analyzeUtxos();
      }

      this.updateStatusError = null;
      this.walletNotRegistered = false;
    } else {
      this.showBalanceButton = false;

      let err = this.wallet.errorObj;
      if (err.name && err.name.match(/WALLET_NOT_FOUND/)) {
        this.walletNotRegistered = true;
      }
      if (err === 'WALLET_NOT_REGISTERED') {
        this.walletNotRegistered = true;
      } else {
        this.updateStatusError = this.wallet.errorObj;
      }
    }
  };

  public recreate() {
    this.onGoingProcessProvider.set('recreating');
    this.walletProvider
      .recreate(this.wallet)
      .then(() => {
        this.onGoingProcessProvider.clear();
        setTimeout(() => {
          this.walletProvider.startScan(this.wallet).then(() => {
            this.updateAll({ force: true });
          });
        });
      })
      .catch(err => {
        this.onGoingProcessProvider.clear();
        this.logger.error(err);
      });
  }

  public goToTxDetails(tx) {
    const txDetailModal = this.modalCtrl.create(TxDetailsModal, {
      walletId: this.wallet.credentials.walletId,
      txid: tx.txid
    });
    txDetailModal.present();
  }

  public openBackupModal(): void {
    this.showBackupNeededMsg = false;
    const infoSheet = this.actionSheetProvider.createInfoSheet(
      'backup-needed-with-activity'
    );
    infoSheet.present();
    infoSheet.onDidDismiss(option => {
      if (option) this.openBackup();
    });
  }

  public openBackup() {
    this.navCtrl.push('BackupKeyPage', {
      keyId: this.wallet.credentials.keyId
    });
  }

  public openAddresses() {
    this.navCtrl.push('WalletAddressesPage', {
      walletId: this.wallet.credentials.walletId
    });
  }

  public getDate(txCreated) {
    const date = new Date(txCreated * 1000);
    return date;
  }

  public trackByFn(index) {
    return index;
  }

  public isFirstInGroup(index) {
    if (index === 0) {
      return true;
    }
    const curTx = this.history[index];
    const prevTx = this.history[index - 1];
    return !this.createdDuringSameMonth(curTx, prevTx);
  }

  private createdDuringSameMonth(curTx, prevTx) {
    return this.timeProvider.withinSameMonth(
      curTx.time * 1000,
      prevTx.time * 1000
    );
  }

  public isDateInCurrentMonth(date) {
    return this.timeProvider.isDateInCurrentMonth(date);
  }

  public createdWithinPastDay(time) {
    return this.timeProvider.withinPastDay(time);
  }

  public isUnconfirmed(tx) {
    return !tx.confirmations || tx.confirmations === 0;
  }

  public openBalanceDetails(): void {
    let walletBalanceModal = this.modalCtrl.create(WalletBalanceModal, {
      status: this.wallet.cachedStatus
    });
    walletBalanceModal.present();
  }

  public back(): void {
    this.navCtrl.pop();
  }

  public openSearchModal(): void {
    const modal = this.modalCtrl.create(
      SearchTxModalPage,
      {
        addressbook: this.addressbook,
        completeHistory: this.wallet.completeHistory,
        wallet: this.wallet
      },
      { showBackdrop: false, enableBackdropDismiss: true }
    );
    modal.present();
    modal.onDidDismiss(data => {
      if (!data || !data.txid) return;
      this.goToTxDetails(data);
    });
  }

  public openExternalLink(url: string): void {
    const optIn = true;
    const title = null;
    const message = this.translate.instant(
      'Help and support information is available at the website.'
    );
    const okText = this.translate.instant('Open');
    const cancelText = this.translate.instant('Go Back');
    this.externalLinkProvider.open(
      url,
      optIn,
      title,
      message,
      okText,
      cancelText
    );
  }

  public doRefresh(refresher) {
    this.updateAll({ force: true });

    setTimeout(() => {
      refresher.complete();
    }, TIMEOUT_FOR_REFRESHER);
  }

  public close() {
    this.viewCtrl.dismiss();
  }

  public goToReceivePage() {
    const params = {
      wallet: this.wallet
    };
    const receive = this.actionSheetProvider.createWalletReceive(params);
    receive.present();
    receive.onDidDismiss(data => {
      if (data === 'goToBackup') this.goToBackup();
      else if (data) this.showErrorInfoSheet(data);
    });
  }

  public goToSendPage() {
    this.navCtrl.push('SendPage', {
      wallet: this.wallet
    });
  }

  public showMoreOptions(): void {
    const showShare =
      this.showShareButton &&
      this.wallet &&
      this.wallet.isComplete() &&
      !this.wallet.needsBackup;
    const optionsSheet = this.actionSheetProvider.createOptionsSheet(
      'address-options',
      { showShare }
    );
    optionsSheet.present();

    optionsSheet.onDidDismiss(option => {
      if (option == 'request-amount') this.requestSpecificAmount();
      if (option == 'share-address') this.shareAddress();
    });
  }

  public requestSpecificAmount(): void {
    this.walletProvider.getAddress(this.wallet, false).then(addr => {
      this.navCtrl.push('AmountPage', {
        toAddress: addr,
        id: this.wallet.credentials.walletId,
        recipientType: 'wallet',
        name: this.wallet.name,
        color: this.wallet.color,
        coin: this.wallet.coin,
        nextPage: 'CustomAmountPage',
        network: this.wallet.network
      });
    });
  }

  public shareAddress(): void {
    if (!this.showShareButton) return;
    this.walletProvider.getAddress(this.wallet, false).then(addr => {
      this.socialSharing.share(addr);
    });
  }
  public showErrorInfoSheet(error: Error | string): void {
    const infoSheetTitle = this.translate.instant('Error');
    const errorInfoSheet = this.actionSheetProvider.createInfoSheet(
      'default-error',
      { msg: this.bwcErrorProvider.msg(error), title: infoSheetTitle }
    );
    errorInfoSheet.present();
  }

  public goToBackup(): void {
    this.navCtrl.push('BackupKeyPage', {
      keyId: this.wallet.credentials.keyId
    });
  }
}
