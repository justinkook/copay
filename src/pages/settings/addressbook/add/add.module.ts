import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressbookAddPage } from './add';

@NgModule({
  declarations: [AddressbookAddPage],
  imports: [IonicPageModule.forChild(AddressbookAddPage)],
  exports: [AddressbookAddPage]
})
export class AddressbookAddModule { }
