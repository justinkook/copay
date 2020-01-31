import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchTxModalPage } from './search-tx-modal';

@NgModule({
  declarations: [SearchTxModalPage],
  imports: [IonicPageModule.forChild(SearchTxModalPage)],
  exports: [SearchTxModalPage]
})
export class SearchTxModalModule {}
