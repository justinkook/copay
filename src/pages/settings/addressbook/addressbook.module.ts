import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressbookAddModule } from './add/add.module';
import { AddressbookPage } from './addressbook';
import { AddressbookViewModule } from './view/view.module';

@NgModule({
  declarations: [AddressbookPage],
  imports: [IonicPageModule.forChild(AddressbookPage), AddressbookAddModule, AddressbookViewModule],
  exports: [AddressbookPage]
})
export class AddressbookModule { }
