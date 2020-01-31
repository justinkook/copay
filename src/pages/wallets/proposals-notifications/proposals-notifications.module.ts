import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProposalsNotificationsPage } from './proposals-notifications';

@NgModule({
  declarations: [ProposalsNotificationsPage],
  imports: [IonicPageModule.forChild(ProposalsNotificationsPage)],
  exports: [ProposalsNotificationsPage]
})
export class ProposalsNotificationsModule {}
