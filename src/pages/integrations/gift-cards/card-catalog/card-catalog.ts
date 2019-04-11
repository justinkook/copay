import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BuyCardPage } from '../buy-card/buy-card';

import { ActionSheetProvider, PlatformProvider } from '../../../../providers';
import { GiftCardProvider } from '../../../../providers/gift-card/gift-card';
import { CardConfig } from '../../../../providers/gift-card/gift-card.types';
import { WideHeaderPage } from '../../../templates/wide-header-page/wide-header-page';

@Component({
  selector: 'card-catalog-page',
  templateUrl: 'card-catalog.html'
})
export class CardCatalogPage extends WideHeaderPage {
  public allCards: CardConfig[];
  public searchQuery: string = '';
  public visibleCards: CardConfig[];
  public cardConfigMap: { [name: string]: CardConfig };

  @ViewChild(WideHeaderPage)
  wideHeaderPage: WideHeaderPage;

  constructor(
    private actionSheetProvider: ActionSheetProvider,
    public giftCardProvider: GiftCardProvider,
    platormProvider: PlatformProvider,
    private navCtrl: NavController
  ) {
    super(platormProvider);
  }

  ngOnInit() {
    this.title = 'Gift Cards';
  }

  ionViewWillEnter() {
    this.giftCardProvider
      .getAvailableCards()
      .then(allCards => {
        this.cardConfigMap = allCards.reduce(
          (map, cardConfig) => ({ ...map, [cardConfig.name]: cardConfig }),
          {}
        );
        this.allCards = allCards;
        this.visibleCards = this.allCards;
        this.updateCardList();
      })
      .catch(_ => {
        this.showError();
        return [] as CardConfig[];
      });
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.updateCardList();
  }

  getHeader(record, recordIndex, records) {
    if (record.featured && recordIndex === 0) {
      return 'Featured Brands';
    }
    const prevRecord = records[recordIndex - 1];
    if (!record.featured && prevRecord && prevRecord.featured) {
      return 'More Brands';
    }
    return null;
  }

  trackBy(record) {
    return record.name;
  }

  updateCardList() {
    this.visibleCards = this.allCards.filter(c =>
      isCardInSearchResults(c, this.searchQuery)
    );
  }

  buyCard(cardConfig: CardConfig) {
    this.navCtrl.push(BuyCardPage, { cardConfig });
  }

  private showError() {
    const errorInfoSheet = this.actionSheetProvider.createInfoSheet(
      'gift-cards-unavailable'
    );
    errorInfoSheet.present();
    errorInfoSheet.onDidDismiss(() => this.navCtrl.pop());
  }
}

export function isCardInSearchResults(c: CardConfig, search: string) {
  const cardName = c.name.toLowerCase();
  const query = search.toLowerCase();
  const matchableText = [cardName, stripPunctuation(cardName)];
  return matchableText.some(text => text.indexOf(query) > -1);
}

export function stripPunctuation(text: string) {
  return text.replace(/[^\w\s]|_/g, '');
}
