import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressbookViewPage } from './view';

@NgModule({
  declarations: [AddressbookViewPage],
  imports: [IonicPageModule.forChild(AddressbookViewPage)],
  exports: [AddressbookViewPage]
})
export class AddressbookViewModule { }
