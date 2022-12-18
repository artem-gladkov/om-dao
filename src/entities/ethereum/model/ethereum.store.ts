import { makeAutoObservable } from "mobx";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { Signer } from "ethers";

export class EthereumStore {
    private _provider: Web3Provider | undefined;

    private _signer: Signer | undefined;

    private _refcode: string | undefined;

    private initialized: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.init();
    }

    private init = () => {
        const refcode = localStorage.getItem("refcode");
        if (refcode === null) {
            localStorage.setItem("refcode", "base");
            this._refcode = "base";
        }
        if (refcode) {
            this._refcode = refcode;
        }
        this.initialized = true;
    };

    public setRefCode = (refcode: string | undefined): void => {
        this._refcode = refcode;
    };

    public get refCode(): string | undefined {
        return this._refcode;
    }

    public setSigner = (signer: Signer): void => {
        this._signer = signer;
    };

    public get signer(): JsonRpcSigner {
        return this._signer as JsonRpcSigner;
    }

    public get provider(): Web3Provider {
        if (!this._provider) {
            throw Error("EthereumProvider не существует");
        }

        return this._provider;
    }
}
