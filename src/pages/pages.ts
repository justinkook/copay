/* Pages */
import { CopayersPage } from '../pages/add/copayers/copayers';
import { CreateWalletPage } from '../pages/add/create-wallet/create-wallet';
import { ImportWalletPage } from '../pages/add/import-wallet/import-wallet';
import { JoinWalletPage } from '../pages/add/join-wallet/join-wallet';
import { SelectCurrencyPage } from '../pages/add/select-currency/select-currency';
import { BackupGamePage } from '../pages/backup/backup-game/backup-game';
import { BackupKeyPage } from '../pages/backup/backup-key/backup-key';
import { SendFeedbackPage } from '../pages/feedback/send-feedback/send-feedback';
import { FinishModalPage } from '../pages/finish/finish';
import { CollectEmailPage } from '../pages/onboarding/collect-email/collect-email';
import { DisclaimerPage } from '../pages/onboarding/disclaimer/disclaimer';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { PaperWalletPage } from '../pages/paper-wallet/paper-wallet';
import { SlideToAcceptPage } from '../pages/slide-to-accept/slide-to-accept';
import { TxDetailsModal } from '../pages/tx-details/tx-details';
import { TxpDetailsPage } from '../pages/txp-details/txp-details';
import { SearchTxModalPage } from '../pages/wallet-details/search-tx-modal/search-tx-modal';
import { WalletBalanceModal } from '../pages/wallet-details/wallet-balance/wallet-balance';
import { WalletDetailsPage } from '../pages/wallet-details/wallet-details';

// Integrations: Invoice
import { SelectInvoicePage } from '../pages/integrations/invoice/select-invoice/select-invoice';

// Integrations: Coinbase
import { BuyCoinbasePage } from '../pages/integrations/coinbase/buy-coinbase/buy-coinbase';
import { CoinbasePage } from '../pages/integrations/coinbase/coinbase';
import { CoinbaseSettingsPage } from '../pages/integrations/coinbase/coinbase-settings/coinbase-settings';
import { CoinbaseTxDetailsPage } from '../pages/integrations/coinbase/coinbase-tx-details/coinbase-tx-details';
import { SellCoinbasePage } from '../pages/integrations/coinbase/sell-coinbase/sell-coinbase';

// Integrations: ShapeShift
import { ShapeshiftConfirmPage } from '../pages/integrations/shapeshift/shapeshift-confirm/shapeshift-confirm';
import { ShapeshiftDetailsPage } from '../pages/integrations/shapeshift/shapeshift-details/shapeshift-details';
import { ShapeshiftSettingsPage } from '../pages/integrations/shapeshift/shapeshift-settings/shapeshift-settings';
import { ShapeshiftShiftPage } from '../pages/integrations/shapeshift/shapeshift-shift/shapeshift-shift';

// Integrations: Simplex
import { SimplexBuyPage } from '../pages/integrations/simplex/simplex-buy/simplex-buy';
import { SimplexDetailsPage } from '../pages/integrations/simplex/simplex-details/simplex-details';
import { SimplexSettingsPage } from '../pages/integrations/simplex/simplex-settings/simplex-settings';

// Integrations: BitPayCard
import { BitPayCardPage } from '../pages/integrations/bitpay-card/bitpay-card';
import { BitPayCardHome } from '../pages/integrations/bitpay-card/bitpay-card-home/bitpay-card-home';
import { BitPayCardIntroPage } from '../pages/integrations/bitpay-card/bitpay-card-intro/bitpay-card-intro';
import { BitPayCardTopUpPage } from '../pages/integrations/bitpay-card/bitpay-card-topup/bitpay-card-topup';
import { BitPaySettingsPage } from '../pages/integrations/bitpay-card/bitpay-settings/bitpay-settings';

/*Includes */
import { CardItemPage } from '../pages/includes/card-item/card-item';
import { CoinSelectorPage } from '../pages/includes/coin-selector/coin-selector';
import { CreateNewWalletPage } from '../pages/includes/create-new-wallet/create-new-wallet';
import { GravatarPage } from '../pages/includes/gravatar/gravatar';
import { MultipleOutputsPage } from '../pages/includes/multiple-outputs/multiple-outputs';
import { TxpPage } from '../pages/includes/txp/txp';

/* Tabs */
import { CardsPage } from '../pages/cards/cards';
import { ScanPage } from '../pages/scan/scan';
import { SendPage } from '../pages/send/send';

/* Home */
import { ProposalsNotificationsPage } from '../pages/wallets/proposals-notifications/proposals-notifications';

/* Settings */
import { FingerprintModalPage } from '../pages/fingerprint/fingerprint';
import { PIN_COMPONENTS } from '../pages/pin/pin';
import { SessionLogPage } from '../pages/settings/about/session-log/session-log';
import { AddressbookViewPage } from '../pages/settings/addressbook/view/view';

/* Wallet Group Settings */
import { ExtendedPrivateKeyPage } from '../pages/settings/key-settings/extended-private-key/extended-private-key';
import { KeyDeletePage } from '../pages/settings/key-settings/key-delete/key-delete';
import { KeyNamePage } from '../pages/settings/key-settings/key-name/key-name';
import { KeyOnboardingPage } from '../pages/settings/key-settings/key-onboarding/key-onboarding';
import { KeyQrExportPage } from '../pages/settings/key-settings/key-qr-export/key-qr-export';

/* Wallet Settings */
import { WalletDeletePage } from '../pages/settings/wallet-settings/wallet-delete/wallet-delete';
import { WalletNamePage } from '../pages/settings/wallet-settings/wallet-name/wallet-name';
import { WalletMnemonicRecoverPage } from './settings/advanced/wallet-recover-page/wallet-mnemonic-recover-page/wallet-mnemonic-recover-page';
import { WalletRecoverPage } from './settings/advanced/wallet-recover-page/wallet-recover-page';

/* Wallet Advanced Settings */
import { AllAddressesPage } from '../pages/settings/wallet-settings/wallet-settings-advanced/wallet-addresses/all-addresses/all-addresses';
import { WalletAddressesPage } from '../pages/settings/wallet-settings/wallet-settings-advanced/wallet-addresses/wallet-addresses';
import { WalletDuplicatePage } from '../pages/settings/wallet-settings/wallet-settings-advanced/wallet-duplicate/wallet-duplicate';
import { WalletExportPage } from '../pages/settings/wallet-settings/wallet-settings-advanced/wallet-export/wallet-export';
import { WalletInformationPage } from '../pages/settings/wallet-settings/wallet-settings-advanced/wallet-information/wallet-information';
import { WalletServiceUrlPage } from '../pages/settings/wallet-settings/wallet-settings-advanced/wallet-service-url/wallet-service-url';
import { WalletTransactionHistoryPage } from '../pages/settings/wallet-settings/wallet-settings-advanced/wallet-transaction-history/wallet-transaction-history';

/* Send */
import { ConfirmPage } from '../pages/send/confirm/confirm';
import { MultiSendPage } from '../pages/send/multi-send/multi-send';
import { TransferToModalPage } from '../pages/send/transfer-to-modal/transfer-to-modal';
import { TransferToPage } from '../pages/send/transfer-to/transfer-to';

/* Receive */
import { CustomAmountPage } from '../pages/receive/custom-amount/custom-amount';

import { CardCatalogPage } from './integrations/gift-cards/card-catalog/card-catalog';
import { GIFT_CARD_PAGES } from './integrations/gift-cards/gift-cards';

export const PAGES = [
  AddressbookViewPage,
  AllAddressesPage,
  BitPayCardHome,
  BitPayCardIntroPage,
  BitPayCardPage,
  BitPaySettingsPage,
  BitPayCardTopUpPage,
  BuyCoinbasePage,
  CardCatalogPage,
  CreateWalletPage,
  CreateNewWalletPage,
  CoinbasePage,
  CoinbaseTxDetailsPage,
  CopayersPage,
  ImportWalletPage,
  JoinWalletPage,
  BackupGamePage,
  BackupKeyPage,
  ConfirmPage,
  MultiSendPage,
  TransferToModalPage,
  TransferToPage,
  CustomAmountPage,
  DisclaimerPage,
  CollectEmailPage,
  ...GIFT_CARD_PAGES,
  GravatarPage,
  FingerprintModalPage,
  CardsPage,
  MultipleOutputsPage,
  OnboardingPage,
  PaperWalletPage,
  ...PIN_COMPONENTS,
  ProposalsNotificationsPage,
  ScanPage,
  SendPage,
  SellCoinbasePage,
  SelectCurrencyPage,
  SelectInvoicePage,
  CoinbaseSettingsPage,
  ShapeshiftConfirmPage,
  ShapeshiftDetailsPage,
  ShapeshiftSettingsPage,
  ShapeshiftShiftPage,
  SimplexBuyPage,
  SimplexDetailsPage,
  SimplexSettingsPage,
  SearchTxModalPage,
  SessionLogPage,
  SendFeedbackPage,
  FinishModalPage,
  TxpDetailsPage,
  TxDetailsModal,
  TxpPage,
  WalletDeletePage,
  WalletNamePage,
  WalletInformationPage,
  WalletAddressesPage,
  WalletExportPage,
  WalletServiceUrlPage,
  WalletTransactionHistoryPage,
  WalletDuplicatePage,
  ExtendedPrivateKeyPage,
  KeyDeletePage,
  KeyQrExportPage,
  KeyNamePage,
  KeyOnboardingPage,
  WalletDetailsPage,
  WalletRecoverPage,
  WalletMnemonicRecoverPage,
  WalletBalanceModal,
  CardItemPage,
  CoinSelectorPage,
  SlideToAcceptPage
];
