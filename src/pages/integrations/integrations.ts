import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

export function setPrice(isFiat: boolean, amount: number) {
  return {
    fiat: isFiat ? amount : undefined,
    qty: isFiat ? undefined : amount
  };
}

export interface Price {
  qty?: number;
  amount?: number;
}
@IonicPage()
@Component({
  selector: 'page-integrations',
  templateUrl: 'integrations.html'
})
export class IntegrationsPage {
  public homeIntegrations;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.homeIntegrations = this.navParams.data.homeIntegrations;
  }

  public goTo(page: string): void {
    this.navCtrl.push(page);
  }
}
