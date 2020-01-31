import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionCardModule } from '../../../components/action-card/action-card.module';
import { SurveyCardPage } from './survey-card';
@NgModule({
  declarations: [SurveyCardPage],
  imports: [IonicPageModule.forChild(SurveyCardPage), ActionCardModule],
  exports: [SurveyCardPage]
})
export class SurveyCardModule {}
