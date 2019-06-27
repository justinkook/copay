import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { Logger } from '../../../../../providers/logger/logger';

// providers
import { ConfigProvider } from '../../../../../providers/config/config';
import { ProfileProvider } from '../../../../../providers/profile/profile';

// pages
import * as _ from 'lodash';

@Component({
  selector: 'page-wallet-information',
  templateUrl: 'wallet-information.html'
})
export class WalletInformationPage {
  public wallet;
  public walletId: string;
  public walletName: string;
  public N: number;
  public M: number;
  public copayers;
  public copayerId;
  public balanceByAddress;
  public account: number;
  public coin: string;
  public network: string;
  public addressType: string;
  public rootPath: string;
  public pubKeys;
  public externalSource: string;
  public canSign: boolean;
  public needsBackup: boolean;
  public unitToSatoshi: number;
  private colorCounter = 1;
  private BLACK_WALLET_COLOR = '#202020';

  constructor(
    private profileProvider: ProfileProvider,
    private configProvider: ConfigProvider,
    private navParams: NavParams,
    private navCtrl: NavController,
    private events: Events,
    private logger: Logger
  ) {}

  ionViewDidLoad() {
    this.logger.info('Loaded:  WalletInformationPage');
  }

  ionViewWillEnter() {
    this.wallet = this.profileProvider.getWallet(this.navParams.data.walletId);
    this.walletName = this.wallet.name;
    this.coin = this.wallet.coin;
    this.unitToSatoshi = this.configProvider.get().wallet.settings[
      this.coin
    ].unitToSatoshi;
    this.walletId = this.wallet.credentials.walletId;
    this.N = this.wallet.credentials.n;
    this.M = this.wallet.credentials.m;
    if (this.wallet.cachedStatus) {
      this.copayers = this.wallet.cachedStatus.wallet.copayers;
    }
    this.copayerId = this.wallet.credentials.copayerId;
    this.balanceByAddress = this.wallet.balanceByAddress;
    this.account = this.wallet.credentials.account;
    this.network = this.wallet.credentials.network;
    this.addressType = this.wallet.credentials.addressType || 'P2SH';
    this.rootPath = this.wallet.credentials.rootPath;
    this.pubKeys = _.map(this.wallet.credentials.publicKeyRing, 'xPubKey');
    this.externalSource = null;
    this.canSign = this.wallet.canSign;
  }

  public saveBlack(): void {
    if (this.colorCounter != 5) {
      this.colorCounter++;
      return;
    }
    this.save(this.BLACK_WALLET_COLOR);
  }

  private save(color): void {
    let opts = {
      colorFor: {}
    };
    opts.colorFor[this.wallet.credentials.walletId] = color;
    this.configProvider.set(opts);
    this.events.publish('Local/ConfigUpdate', {
      walletId: this.wallet.credentials.walletId
    });
    this.navCtrl.popToRoot();
  }
}
