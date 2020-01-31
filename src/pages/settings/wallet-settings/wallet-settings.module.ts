import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletSettingsPage } from './wallet-settings';

@NgModule({
  declarations: [WalletSettingsPage],
  imports: [IonicPageModule.forChild(WalletSettingsPage)],
  exports: [WalletSettingsPage]
})
export class WalletSettingsModule { }
