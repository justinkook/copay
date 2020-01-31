import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeModule } from '../home/home.module';
import { SettingsModule } from '../settings/settings.module';
import { WalletsModule } from '../wallets/wallets.module';
import { TabsPage } from './tabs';
@NgModule({
  declarations: [TabsPage],
  imports: [IonicPageModule.forChild(TabsPage), HomeModule, WalletsModule, SettingsModule],
  exports: [TabsPage]
})
export class TabsModule { }
