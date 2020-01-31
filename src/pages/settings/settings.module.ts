import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderByPipe } from '../../pipes/order-by';
import { AboutModule } from './about/about.module';
import { AddressbookModule } from './addressbook/addressbook.module';
import { AdvancedModule } from './advanced/advanced.module';
import { AltCurrencyModule } from './alt-currency/alt-currency.module';
import { FeePolicyModule } from './fee-policy/fee-policy.module';
import { KeySettingsModule } from './key-settings/key-settings.module';
import { LanguageModule } from './language/language.module';
import { LockModule } from './lock/lock.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SettingsPage } from './settings';
import { ShareModule } from './share/share.module';
import { WalletSettingsModule } from './wallet-settings/wallet-settings.module';

@NgModule({
  declarations: [
    SettingsPage,
    OrderByPipe
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    AboutModule,
    AddressbookModule,
    AdvancedModule,
    AltCurrencyModule,
    FeePolicyModule,
    KeySettingsModule,
    LanguageModule,
    LockModule,
    NotificationsModule,
    ShareModule,
    WalletSettingsModule,
    TranslateModule
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsModule { }
