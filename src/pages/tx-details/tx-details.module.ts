import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TxDetailsModal } from './tx-details';

@NgModule({
  declarations: [TxDetailsModal],
  imports: [IonicPageModule.forChild(TxDetailsModal)],
  exports: [TxDetailsModal]
})
export class TxDetailsModule {}
