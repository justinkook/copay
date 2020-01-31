import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExchangeRates } from './exchange-rates';

@NgModule({
  declarations: [ExchangeRates],
  imports: [
    IonicPageModule.forChild(ExchangeRates),
  ],
  exports: [ExchangeRates]
})
export class ExchangeRatesModule { }
