import { CoinsMap } from './currency';

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
  isERCToken: boolean;
  isStableCoin: boolean;
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

export const AvailableCoinOpts: CoinsMap<CoinOpts> = {
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
    isERCToken: false,
    isStableCoin: false,
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
    isERCToken: false,
    isStableCoin: false,
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
    isERCToken: false,
    isStableCoin: false,
    singleAddress: true,
    paymentCode: 'EIP681',
    protocolPrefix: 'ethereum',
    ratesApi: 'https://bitpay.com/api/rates/eth',
    blockExplorerUrls: 'insight.bitcore.io/#/ETH/',
    feeUnit: 'Gwei',
    feeUnitAmount: 1e9,
    blockTime: 0.2,
    maxMerchantFee: 'urgent'
  },
  pax: {
    name: 'Paxos Standard',
    chain: 'ETH',
    coin: 'pax',
    unitName: 'PAX',
    unitToSatoshi: 1e18,
    unitDecimals: 18,
    unitCode: 'pax',
    hasMultiSig: false,
    hasMultiSend: false,
    isUtxo: false,
    isERCToken: true,
    isStableCoin: true,
    singleAddress: true,
    paymentCode: 'EIP681b',
    protocolPrefix: 'ethereum',
    ratesApi: 'https://bitpay.com/api/rates/pax',
    blockExplorerUrls: 'insight.bitcore.io/#/ETH/',
    feeUnit: 'Gwei',
    feeUnitAmount: 1e9,
    blockTime: 0.2,
    maxMerchantFee: 'urgent'
  },
  usdc: {
    name: 'USD Coin',
    chain: 'ETH',
    coin: 'usdc',
    unitName: 'USDC',
    unitToSatoshi: 1e6,
    unitDecimals: 6,
    unitCode: 'usdc',
    hasMultiSig: false,
    hasMultiSend: false,
    isUtxo: false,
    isERCToken: true,
    isStableCoin: true,
    singleAddress: true,
    paymentCode: 'EIP681b',
    protocolPrefix: 'ethereum',
    ratesApi: 'https://bitpay.com/api/rates/usdc',
    blockExplorerUrls: 'insight.bitcore.io/#/ETH/',
    feeUnit: 'Gwei',
    feeUnitAmount: 1e9,
    blockTime: 0.2,
    maxMerchantFee: 'urgent'
  },
  gusd: {
    name: 'Gemini Dollar',
    chain: 'ETH',
    coin: 'gusd',
    unitName: 'GUSD',
    unitToSatoshi: 1e2,
    unitDecimals: 2,
    unitCode: 'gusd',
    hasMultiSig: false,
    hasMultiSend: false,
    isUtxo: false,
    isERCToken: true,
    isStableCoin: true,
    singleAddress: true,
    paymentCode: 'EIP681b',
    protocolPrefix: 'ethereum',
    ratesApi: 'https://bitpay.com/api/rates/gusd',
    blockExplorerUrls: 'insight.bitcore.io/#/ETH/',
    feeUnit: 'Gwei',
    feeUnitAmount: 1e9,
    blockTime: 0.2,
    maxMerchantFee: 'urgent'
  }
};
