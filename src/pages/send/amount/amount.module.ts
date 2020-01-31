import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AmountPage } from './amount';

@NgModule({
  declarations: [AmountPage],
  imports: [
    IonicPageModule.forChild(AmountPage),
  ],
  exports: [AmountPage]
})
export class AmountModule { }
