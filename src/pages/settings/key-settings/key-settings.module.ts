import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeySettingsPage } from './key-settings';

@NgModule({
  declarations: [KeySettingsPage],
  imports: [IonicPageModule.forChild(KeySettingsPage)],
  exports: [KeySettingsPage]
})
export class KeySettingsModule { }
