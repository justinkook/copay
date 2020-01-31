import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TxpDetailsPage } from './txp-details';

@NgModule({
  declarations: [TxpDetailsPage],
  imports: [IonicPageModule.forChild(TxpDetailsPage)],
  exports: [TxpDetailsPage]
})
export class TxpDetailsModule {}
