import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ExchangeRatesModule } from '../../components/exchange-rates/exchange-rates.module';
import { FeedbackCardModule } from '../includes/feedback-card/feedback-card.module';
import { SurveyCardModule } from '../includes/survey-card/survey-card.module';
import { HomePage } from './home';

@NgModule({
  declarations: [HomePage],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild(),
    ExchangeRatesModule,
    FeedbackCardModule,
    SurveyCardModule
  ],
  exports: [HomePage]
})
export class HomeModule { }
