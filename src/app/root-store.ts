import { makeAutoObservable } from 'mobx';
import { SignerStore } from '../entities/signer';
import { JsonRpcSigner, Provider } from '@ethersproject/providers';
import { ProviderStore } from '../entities/provider';
import { Client, configureChains, createClient, goerli, mainnet } from 'wagmi';
import {
	EthereumClient,
	modalConnectors,
	walletConnectProvider,
} from '@web3modal/ethereum';
import { isProd, WALLET_CONNECT_PROJECT_ID } from '../shared/config';

const AVAILABLE_CHAINS = [isProd() ? mainnet : goerli];

export class RootStore {
	private _signerStore: SignerStore | undefined;

	private _providerStore: ProviderStore | undefined;

	private _wagmiClient: Client | undefined;

	private _ethereumClient: EthereumClient | undefined;

	private _isAppInitialized = false;

	private _refCode: string | undefined;

	constructor() {
		makeAutoObservable(this);
		this.init();
	}

	protected init = () => {
		try {
			this.createClients();
			this.initStores();
			this.checkRefCode();
		} catch (e) {
			console.log(e);
		} finally {
			this._isAppInitialized = true;
		}
	};

	protected initStores = () => {
		const { provider } = this.wagmiClient;

		this._signerStore = new SignerStore();
		this._providerStore = new ProviderStore(provider);
	};

	protected createClients = () => {
		//eslint-disable-next-line
		const { provider } = configureChains(AVAILABLE_CHAINS, [
			walletConnectProvider({ projectId: WALLET_CONNECT_PROJECT_ID }),
		]);

		const wagmiClient = createClient({
			autoConnect: true,
			connectors: modalConnectors({
				appName: 'web3Modal',
				chains: AVAILABLE_CHAINS,
			}),
			provider,
		});
		const ethereumClient = new EthereumClient(wagmiClient, AVAILABLE_CHAINS);

		this._wagmiClient = wagmiClient as Client;
		this._ethereumClient = ethereumClient;
	};

	public checkRefCode = () => {
		const refCode = localStorage.getItem('refCode');

		if (refCode) {
			this._refCode = refCode;
		}
	};

	public updateRefCode = (newRefCode: string | undefined) => {
		if (newRefCode) {
			localStorage.setItem('refCode', newRefCode);
		} else {
			localStorage.removeItem('refCode');
		}

		this._refCode = newRefCode;
	};

	public get refCode(): string | undefined {
		return this._refCode;
	}

	public get signerStore(): SignerStore {
		if (!this._signerStore) {
			throw Error('SignerStore не существует');
		}

		return this._signerStore;
	}

	public get providerStore(): ProviderStore {
		if (!this._providerStore) {
			throw Error('ProviderStore не существует');
		}
		return this._providerStore;
	}

	public get ethereumClient(): EthereumClient {
		if (!this._ethereumClient) {
			throw Error('EthereumClient не существует');
		}

		return this._ethereumClient;
	}

	public get wagmiClient(): Client {
		if (!this._wagmiClient) {
			throw Error('WagmiClient не существует');
		}

		return this._wagmiClient;
	}

	public get signerOrProvider(): JsonRpcSigner | Provider | undefined {
		if (this.signerStore.hasSigner) {
			return this.signerStore.signer;
		}

		if (this.providerStore.hasProvider) {
			return this.providerStore.provider;
		}

		console.log('undefined');
		return undefined;
	}

	public get isAppInitialized(): boolean {
		return this._isAppInitialized && this.providerStore.hasProvider;
	}
}
