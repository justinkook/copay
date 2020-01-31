import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CopayersPage } from './copayers';

@NgModule({
  declarations: [CopayersPage],
  imports: [IonicPageModule.forChild(CopayersPage)],
  exports: [CopayersPage]
})
export class CopayersModule {}
