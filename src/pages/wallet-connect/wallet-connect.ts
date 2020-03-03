import { Component } from '@angular/core';
import WalletConnect from '@walletconnect/browser';
import * as ethers from 'ethers';
import { NavParams } from 'ionic-angular';
import { Logger } from '../../providers/logger/logger';
import { PersistenceProvider } from '../../providers/persistence/persistence';
import { ProfileProvider } from '../../providers/profile/profile';
import { WalletProvider } from '../../providers/wallet/wallet';
import { DEFAULT_ACTIVE_INDEX, DEFAULT_CHAIN_ID } from './constants';
import { supportedProviders } from './providers';
import { IProviderData } from './types';

@Component({
  selector: 'page-wallet-connect',
  templateUrl: 'wallet-connect.html'
})
export class WalletConnectPage {
  loading: boolean = false;
  scanner: boolean = false;
  walletConnector: WalletConnect | null = null;
  uri: string = '';
  peerMeta: {
    description: string;
    url: string;
    icons: string[];
    name: string;
    ssl?: boolean;
  } = {
      description: '',
      url: '',
      icons: [],
      name: '',
      ssl: false
    };
  connected: boolean = false;
  chainId: number = 1;
  accounts: string[];
  address: string;
  requests: any[] = [];
  results: any[] = [];
  displayRequest: any = null;
  activeIndex: number = DEFAULT_ACTIVE_INDEX;
  activeChainId: number = DEFAULT_CHAIN_ID;
  wallets;
  wallet: ethers.Wallet | null = null;

  constructor(
    private logger: Logger,
    private navParams: NavParams,
    private persistenceProvider: PersistenceProvider,
    private profileProvider: ProfileProvider,
    private walletProvider: WalletProvider
  ) {
    this.logger.debug('WalletConnectProvider initialized');
  }

  ionViewWillEnter() {
    this.initWallet();
  }

  public async initWallet() {
    this.wallets = this.profileProvider.getWallets({ coin: 'eth' });
    const session = await this.persistenceProvider.getWalletConnect();

    if (!session) {
      await this.updateWallet(this.activeIndex, this.chainId);
    } else {
      this.walletConnector = new WalletConnect({ session });

      const { connected, accounts, peerMeta } = this.walletConnector;

      this.address = accounts[0];

      this.activeIndex = accounts.indexOf(this.address);
      this.chainId = this.walletConnector.chainId;

      await this.updateWallet(this.activeIndex, this.chainId);

      this.connected = connected;
      this.accounts = accounts;
      this.peerMeta = peerMeta;

      this.subscribeToEvents();
    }
  }

  public async initWalletConnect() {
    this.uri = this.navParams.data.uri;
    this.loading = true;

    try {
      this.walletConnector = new WalletConnect({ uri: this.uri });

      window['walletConnector'] = this.walletConnector; // tslint:disable-line

      if (!this.walletConnector.connected) {
        await this.walletConnector.createSession();
      }

      const { connected, accounts, peerMeta } = this.walletConnector;
      window.console.log(accounts, peerMeta, connected);
      this.accounts = accounts;
      this.loading = false;
      this.uri = this.walletConnector.uri;

      this.subscribeToEvents();
    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  public approveSession() {
    if (this.walletConnector) {
      this.walletConnector.approveSession({
        chainId: this.chainId,
        accounts: [this.address]
      });
    }
  }

  public async updateSession(sessionParams: {
    chainId?: number;
    activeIndex?: number;
  }) {
    const _chainId = sessionParams.chainId || this.chainId;
    const _activeIndex = sessionParams.activeIndex || this.activeIndex;
    const address = this.accounts[_activeIndex];
    if (this.walletConnector) {
      this.walletConnector.updateSession({
        chainId: _chainId,
        accounts: [address]
      });
    }
  }

  public rejectSession() {
    if (this.walletConnector) {
      this.walletConnector.rejectSession();
    }
  }

  public killSession() {
    if (this.walletConnector) {
      this.walletConnector.killSession();
    }
  }

  public async updateChain(chainId: number | string) {
    const _chainId = Number(chainId);
    await this.updateWallet(this.activeIndex, _chainId);
    await this.updateSession({ chainId: _chainId });
  }

  public async updateAddress(activeIndex: number) {
    await this.updateWallet(activeIndex, this.chainId);
    await this.updateSession({ activeIndex });
  }

  public openRequest(request: any) {
    this.displayRequest = request;
  }

  public async closeRequest() {
    const filteredRequests = this.requests.filter(
      request => request.id !== this.displayRequest.id
    );

    this.requests = filteredRequests;
    this.displayRequest = null;
  }

  public async rejectRequest() {
    if (this.walletConnector) {
      this.walletConnector.rejectRequest({
        id: this.displayRequest.id,
        error: { message: 'Failed or Rejected Request' }
      });
    }
    await this.closeRequest();
  }

  public subscribeToEvents() {
    if (this.walletConnector) {
      this.walletConnector.on('session_request', (error, payload) => {
        this.logger.debug('walletConnector.on("session_request")');

        if (error) {
          throw error;
        }

        this.peerMeta = payload.params[0].peerMeta;
      });

      this.walletConnector.on('session_update', (error, _payload) => {
        this.logger.debug('walletConnector.on("session_update")');

        if (error) {
          throw error;
        }
      });

      this.walletConnector.on('call_request', (error, payload) => {
        this.logger.debug('walletConnector.on("call_request")');

        if (error) {
          throw error;
        }
        const requests = this.requests;
        requests.push(payload);
        this.requests = requests;
      });

      this.walletConnector.on('connect', (error, _payload) => {
        this.logger.debug('walletConnector.on("connect")');

        if (error) {
          throw error;
        }
        this.connected = true;
      });

      this.walletConnector.on('disconnect', (error, _payload) => {
        this.logger.debug('walletConnector.on("disconnect")');

        if (error) {
          throw error;
        }
      });

      if (this.walletConnector.connected) {
        const { chainId, accounts } = this.walletConnector;
        const index = 0;
        this.address = accounts[index];
        this.updateWallet(index, chainId);
        this.connected = true;
        this.chainId = chainId;
      }
    }
  }

  public async approveRequest() {
    let errorMsg = '';

    try {
      let result = null;

      if (this.walletConnector) {
        if (!this.getWallet()) {
          await this.updateWallet(this.activeIndex, this.chainId);
        }

        let transaction = null;
        let addressRequested = null;

        switch (this.displayRequest.method) {
          case 'eth_sendTransaction':
            transaction = this.displayRequest.params[0];
            addressRequested = transaction.from;
            if (this.address.toLowerCase() === addressRequested.toLowerCase()) {
              result = await this.walletProvider.broadcastTx(
                this.wallet,
                transaction
              );
            } else {
              errorMsg = 'Address requested does not match active account';
            }
            break;
          case 'eth_signTransaction':
            transaction = this.displayRequest.params[0];
            addressRequested = transaction.from;
            if (this.address.toLowerCase() === addressRequested.toLowerCase()) {
              result = await this.walletProvider.publishAndSign(
                this.wallet,
                transaction
              );
            } else {
              errorMsg = 'Address requested does not match active account';
            }
            break;
          default:
            break;
        }

        if (result) {
          this.walletConnector.approveRequest({
            id: this.displayRequest.id,
            result
          });
        } else {
          let message = 'JSON RPC method not supported';
          if (!this.getWallet()) {
            message = 'No Active Account';
          }
          this.walletConnector.rejectRequest({
            id: this.displayRequest.id,
            error: { message }
          });
        }
      }
    } catch (error) {
      this.logger.error(error);
      if (this.walletConnector) {
        this.walletConnector.rejectRequest({
          id: this.displayRequest.id,
          error: { message: errorMsg || 'Failed or Rejected Request' }
        });
      }
    }

    this.closeRequest();
  }

  public updateWallet(index: number, chainId: number) {
    this.activeIndex = index;
    this.activeChainId = chainId;
    const rpcUrl = this.getChainData(chainId).rpc_url;
    this.wallet = this.generateWallet(index);
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.wallet.connect(provider);
    return this.wallet;
  }

  public getChainData(chainId: number): IProviderData {
    const chainData = supportedProviders.filter(
      (chain: any) => chain.chain_id === chainId
    )[0];

    if (!chainData) {
      throw new Error('ChainId missing or not supported');
    }

    const API_KEY = 'f73d326fec924c34abc4d16233920356';

    if (
      chainData.rpc_url.includes('infura.io') &&
      chainData.rpc_url.includes('%API_KEY%') &&
      API_KEY
    ) {
      const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY);

      return {
        ...chainData,
        rpc_url: rpcUrl
      };
    }

    return chainData;
  }

  public getWallet(index?: number, chainId?: number): ethers.Wallet {
    let _wallet = this.wallet;
    if (
      !_wallet ||
      this.activeIndex === index ||
      this.activeChainId === chainId
    ) {
      _wallet = this.updateWallet(index, chainId);
    }
    return _wallet;
  }

  public generateWallet(account: number) {
    const newWallet = ethers.Wallet.fromMnemonic('rhythm egg tube lunar father cattle breeze laugh ask witness real curtain', `m/44'/60'/${account}'/0/0`);
    return newWallet;
  }
}
