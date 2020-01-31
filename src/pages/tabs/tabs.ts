import { Component, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  appName: string;
  @ViewChild('tabs')
  tabs;

  constructor(private appProvider: AppProvider) {
    this.appName = this.appProvider.info.nameCase;
  }

  homeRoot = 'HomePage';
  walletsRoot = 'WalletsPage';
  cardsRoot = 'CardsPage';
  settingsRoot = 'SettingsPage';
}
