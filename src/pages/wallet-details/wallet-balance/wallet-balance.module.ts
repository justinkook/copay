import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletBalanceModal } from './wallet-balance';

@NgModule({
  declarations: [WalletBalanceModal],
  imports: [IonicPageModule.forChild(WalletBalanceModal)],
  exports: [WalletBalanceModal]
})
export class WalletBalanceModule {}
