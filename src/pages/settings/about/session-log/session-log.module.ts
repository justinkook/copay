import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SessionLogPage } from './session-log';

@NgModule({
  declarations: [SessionLogPage],
  imports: [IonicPageModule.forChild(SessionLogPage)],
  exports: [SessionLogPage]
})
export class SessionLogModule { }
