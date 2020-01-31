import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntegrationsPage } from './integrations';

@NgModule({
  declarations: [
    IntegrationsPage,
  ],
  imports: [
    IonicPageModule.forChild(IntegrationsPage),
  ],
  exports: [
    IntegrationsPage
  ]
})
export class IntegrationsModule { }
