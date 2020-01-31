import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { WideHeaderModule } from '../../../pages/templates/wide-header-page/wide-header-page.module';
import { AboutPage } from './about';

@NgModule({
  declarations: [AboutPage],
  imports: [IonicPageModule.forChild(AboutPage), TranslateModule, WideHeaderModule],
  exports: [AboutPage]
})
export class AboutModule { }
