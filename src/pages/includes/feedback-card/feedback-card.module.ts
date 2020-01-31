import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackCardPage } from './feedback-card';

@NgModule({
  declarations: [FeedbackCardPage],
  imports: [IonicPageModule.forChild(FeedbackCardPage)],
  exports: [FeedbackCardPage]
})
export class FeedbackCardModule {}
