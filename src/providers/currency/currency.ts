import * as _ from 'lodash';

export enum Coin {
  BTC = 'btc',
  BCH = 'bch',
  ETH = 'eth'
}

export type CoinsMap<T> = { [key in Coin]: T };

export interface CoinOpts {
  // Bitcore-node
  name: string;
  chain: string;
  coin: string;
  // Config/Precision
  unitName: string;
  unitToSatoshi: number;
  unitDecimals: number;
  unitCode: string;
  // Properties
  hasMultiSig: boolean;
  hasMultiSend: boolean;
  isUtxo: boolean;
  singleAddress: boolean;
  paymentCode: string;
  protocolPrefix: string;
  // Urls
  ratesApi: string;
  blockExplorerUrls: string;
  // Fee Units
  feeUnit: string;
  feeUnitAmount: number;
  blockTime: number;
  maxMerchantFee: string;
}
export class CurrencyProvider {
  public coinOpts: CoinsMap<CoinOpts>;
  public ratesApi = {} as CoinsMap<string>;
  public blockExplorerUrls = {} as CoinsMap<string>;
  public availableCoins: Coin[];

  constructor() {
    this.coinOpts = {
      btc: {
        name: 'Bitcoin',
        chain: 'BTC',
        coin: 'btc',
        unitName: 'BTC',
        unitToSatoshi: 100000000,
        unitDecimals: 8,
        unitCode: 'btc',
        hasMultiSig: true,
        hasMultiSend: true,
        isUtxo: true,
        singleAddress: false,
        paymentCode: 'BIP73',
        protocolPrefix: 'bitcoin',
        ratesApi: 'https://bitpay.com/api/rates',
        blockExplorerUrls: 'insight.bitcore.io/#/BTC/',
        feeUnit: 'sat/byte',
        feeUnitAmount: 1000,
        blockTime: 10,
        maxMerchantFee: 'urgent'
      },
      bch: {
        name: 'Bitcoin Cash',
        chain: 'BCH',
        coin: 'bch',
        unitName: 'BCH',
        unitToSatoshi: 100000000,
        unitDecimals: 8,
        unitCode: 'bch',
        hasMultiSig: true,
        hasMultiSend: true,
        isUtxo: true,
        singleAddress: false,
        paymentCode: 'BIP73',
        protocolPrefix: 'bitcoincash',
        ratesApi: 'https://bitpay.com/api/rates/bch',
        blockExplorerUrls: 'insight.bitcore.io/#/BCH/',
        feeUnit: 'sat/byte',
        feeUnitAmount: 1000,
        blockTime: 10,
        maxMerchantFee: 'normal'
      },
      eth: {
        name: 'Ethereum',
        chain: 'ETH',
        coin: 'eth',
        unitName: 'ETH',
        unitToSatoshi: 1e18,
        unitDecimals: 18,
        unitCode: 'eth',
        hasMultiSig: false,
        hasMultiSend: false,
        isUtxo: false,
        singleAddress: true,
        paymentCode: 'EIP681',
        protocolPrefix: 'ethereum',
        ratesApi: 'https://bitpay.com/api/rates/eth',
        blockExplorerUrls: 'insight.bitcore.io/#/ETH/',
        feeUnit: 'Gwei',
        feeUnitAmount: 1e9,
        blockTime: 0.2,
        maxMerchantFee: 'urgent'
      }
    };
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
