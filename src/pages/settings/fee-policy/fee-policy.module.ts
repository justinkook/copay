import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeePolicyPage } from './fee-policy';

@NgModule({
  declarations: [FeePolicyPage],
  imports: [IonicPageModule.forChild(FeePolicyPage)],
  exports: [FeePolicyPage]
})
export class FeePolicyModule { }
