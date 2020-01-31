import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltCurrencyPage } from './alt-currency';

@NgModule({
  declarations: [AltCurrencyPage],
  imports: [IonicPageModule.forChild(AltCurrencyPage)],
  exports: [AltCurrencyPage]
})
export class AltCurrencyModule { }
