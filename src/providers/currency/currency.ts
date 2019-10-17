import * as _ from 'lodash';
import { AvailableCoinOpts, CoinOpts } from './coin';
import { Token, TokenOpts } from './token';

export enum Coin {
  BTC = 'btc',
  BCH = 'bch',
  ETH = 'eth',
  PAX = 'pax',
  USDC = 'usdc',
  GUSD = 'gusd'
}

export type CoinsMap<T> = { [key in Coin]: T };

export class CurrencyProvider {
  public coinOpts: CoinsMap<CoinOpts>;
  public ratesApi = {} as CoinsMap<string>;
  public blockExplorerUrls = {} as CoinsMap<string>;
  public availableCoins: Coin[];
  public availableTokens: Token[];

  constructor() {
    this.coinOpts = AvailableCoinOpts;
    this.availableTokens = Object.values(TokenOpts);
    this.availableCoins = Object.keys(this.coinOpts) as Coin[];
    for (const opts of Object.values(this.coinOpts)) {
      const { blockExplorerUrls, coin, ratesApi } = opts;
      this.blockExplorerUrls[coin] = blockExplorerUrls;
      this.ratesApi[coin] = ratesApi;
    }
  }

  isUtxoCoin(coin: Coin): boolean {
    return !!this.coinOpts[coin].isUtxo;
  }

  isSingleAddress(coin: Coin): boolean {
    return !!this.coinOpts[coin].singleAddress;
  }

  isSharedCoin(coin: Coin): boolean {
    return !!this.coinOpts[coin].hasMultiSig;
  }

  isERCToken(coin: Coin): boolean {
    return !!this.coinOpts[coin].isERCToken;
  }

  isMultiSend(coin: Coin): boolean {
    return !!this.coinOpts[coin].hasMultiSend;
  }

  getAvailableCoins(): Coin[] {
    return this.availableCoins;
  }

  getAvailableChains(): string[] {
    return _.uniq(
      _.map(Object.values(this.coinOpts), (opts: CoinOpts) =>
        opts.chain.toLowerCase()
      )
    );
  }

  getAvailableTokens(): Token[] {
    return this.availableTokens;
  }

  getMultiSigCoins(): Coin[] {
    return this.availableCoins.filter(coin => this.isSharedCoin(coin));
  }

  getCoinName(coin: Coin): string {
    return this.coinOpts[coin].name;
  }

  getChain(coin: Coin): string {
    return this.coinOpts[coin].chain;
  }

  getRatesApi() {
    return this.ratesApi;
  }

  getBlockExplorerUrls() {
    return this.blockExplorerUrls;
  }

  getPaymentCode(coin: Coin): string {
    return this.coinOpts[coin].paymentCode;
  }

  getPrecision(coin: Coin) {
    const { unitName, unitToSatoshi, unitDecimals, unitCode } = this.coinOpts[
      coin
    ];
    return { unitName, unitToSatoshi, unitDecimals, unitCode };
  }

  getProtocolPrefix(coin: Coin) {
    return this.coinOpts[coin].protocolPrefix;
  }

  getFeeUnits(coin: Coin) {
    const { feeUnit, feeUnitAmount, blockTime } = this.coinOpts[coin];
    return { feeUnit, feeUnitAmount, blockTime };
  }

  getMaxMerchantFee(coin: Coin): string {
    return this.coinOpts[coin].maxMerchantFee;
  }
}
