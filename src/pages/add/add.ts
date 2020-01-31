import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// providers
import { Logger } from '../../providers';
@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {
  public keyId: string;
  public isOnboardingFlow: boolean;
  public isZeroState: boolean;

  constructor(
    private navCtrl: NavController,
    private logger: Logger,
    private navParams: NavParams
  ) { }

  ionViewDidLoad() {
    this.logger.info('Loaded: AddPage');
    this.keyId = this.navParams.data.keyId;
    this.isOnboardingFlow = this.navParams.data.isOnboardingFlow;
    this.isZeroState = this.navParams.data.isZeroState;
  }

  public goToAddWalletPage(
    isShared: boolean,
    isJoin: boolean,
    isCreate: boolean
  ): void {
    if (isCreate) {
      if (this.navParams.data.isMultipleSeed) {
        this.navCtrl.push('AddWalletPage', {
          isCreate,
          isMultipleSeed: true,
          isShared,
          url: this.navParams.data.url
        });
      } else {
        this.navCtrl.push('SelectCurrencyPage', {
          isShared,
          isOnboardingFlow: this.isOnboardingFlow,
          isZeroState: this.isZeroState && !isShared,
          keyId: this.keyId
        });
      }
    } else if (isJoin) {
      this.navCtrl.push('JoinWalletPage', {
        keyId: this.keyId,
        url: this.navParams.data.url
      });
    }
  }

  public goToImportWallet(): void {
    this.navCtrl.push('ImportWalletPage');
  }

  public goBack(): void {
    this.navCtrl.pop();
  }
}
