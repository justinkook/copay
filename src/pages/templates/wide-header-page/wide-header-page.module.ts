import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WideHeaderPage } from './wide-header-page';

@NgModule({
  declarations: [WideHeaderPage],
  imports: [IonicPageModule.forChild(WideHeaderPage)],
  exports: [WideHeaderPage]
})
export class WideHeaderModule {}
