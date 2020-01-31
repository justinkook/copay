import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimplexPage } from './simplex';

@NgModule({
  declarations: [
    SimplexPage,
  ],
  imports: [
    IonicPageModule.forChild(SimplexPage),
  ],
  exports: [
    SimplexPage
  ]
})
export class SimplexModule { }
