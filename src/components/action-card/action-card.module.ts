import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionCardComponent } from './action-card';

@NgModule({
  declarations: [ActionCardComponent],
  imports: [IonicPageModule.forChild(ActionCardComponent)],
  exports: [ActionCardComponent]
})
export class ActionCardModule {}
