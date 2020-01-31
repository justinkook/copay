import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackCardModule } from '../includes/feedback-card/feedback-card.module';
import { SurveyCardModule } from '../includes/survey-card/survey-card.module';
import { WalletsPage } from './wallets';

@NgModule({
  declarations: [WalletsPage],
  imports: [IonicPageModule.forChild(WalletsPage),
  TranslateModule.forChild(),
    FeedbackCardModule,
    SurveyCardModule
  ],
  exports: [WalletsPage]
})
export class WalletsModule { }
