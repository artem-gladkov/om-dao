import { makeAutoObservable } from "mobx";
import { Contract } from "@ethersproject/contracts";
import { TOKEN_ABI, TOKEN_ADDRESS, TOKEN_SYMBOLS } from "../../../entities";
import { BaseTokensFormSubmitData } from "../../base-tokens-form";
import { CR_SWAP_CONTRACT_DATA } from "../constants";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { formatBytes32String } from "@ethersproject/strings";

import { SwapStatus } from "../../swap-tokens";
import {RootStore} from "../../../app/root-store";

export class CRFormLaunchStore {
    private _exchangeRate: number = 0;

    private _isInitialized: boolean = false;

    private _swapStatus: SwapStatus = SwapStatus.READY;

    private _refcode: string = "base";

    private _accountAddress: string =
        "0x0000000000000000000000000000000000000000";

    constructor(
        private _rootStore: RootStore,
        refCode: string | undefined,
        accountAddress: string | undefined
    ) {
        makeAutoObservable(this);

        this._refcode = refCode ? refCode : "base";
        this._accountAddress = accountAddress
            ? accountAddress
            : "0x0000000000000000000000000000000000000000";

        this.init();
    }

    private init = async (): Promise<void> => {
        try {
            const bytes32Symbol = formatBytes32String(TOKEN_SYMBOLS.CR);
            const bigNumber = await this.swapContract.myPrice(
                this._accountAddress,
                bytes32Symbol
            );
            this.exchangeRate = +formatUnits(bigNumber, "6");
        } catch (e) {
            console.log(e);
        } finally {
            this.isInitialized = true;
        }
    };

    public onSubmit = async ({ sourceAmount }: BaseTokensFormSubmitData) => {
        this.swapStatus = SwapStatus.STARTING;

        try {
            const decimals = await this.sourceContract.decimals();
            const unit256Amount = parseUnits(sourceAmount, decimals);

            this.swapStatus = SwapStatus.AWAITING_CONFIRM;
            const approveTransaction = await this.sourceContract.approve(
                this.swapContract.address,
                unit256Amount
            );

            this.swapStatus = SwapStatus.AWAITING_BLOCK_MINING;
            await approveTransaction.wait();

            this.swapStatus = SwapStatus.AWAITING_CONFIRM;
            const bytes32Symbol = formatBytes32String(TOKEN_SYMBOLS.CR);
            const bytes32ReferalCode = formatBytes32String(this._refcode);

            const buyTransaction = await this.swapContract.buyToken(
                bytes32Symbol,
                unit256Amount,
                bytes32ReferalCode
            );

            this.swapStatus = SwapStatus.AWAITING_BLOCK_MINING;
            await buyTransaction.wait();

            this.swapStatus = SwapStatus.SUCCESS;
        } catch (e) {
            this.swapStatus = SwapStatus.ERROR;
            console.log(e);
        }
    };

    public calculateDestinationAmount = (sourceAmount: string): string => {
        return this._exchangeRate.toString() === "0"
            ? "0"
            : (+sourceAmount / this._exchangeRate).toString();
    };

    public get sourceContract(): Contract {
        return new Contract(
            TOKEN_ADDRESS.OMD,
            TOKEN_ABI.OMD,
            this._rootStore.signerOrProvider
        );
    }


    public get destinationContract(): Contract {
        return new Contract(
            TOKEN_ADDRESS.omdwCRB,
            TOKEN_ABI.omdwCRB,
            this._rootStore.signerOrProvider
        );
    }

    public get swapContract(): Contract {
        return new Contract(
            CR_SWAP_CONTRACT_DATA.address,
            CR_SWAP_CONTRACT_DATA.abi,
            this._rootStore.signerOrProvider
        );

    }

    public get isLoading(): boolean {
        return (
            !this._isInitialized ||
            [
                SwapStatus.STARTING,
                SwapStatus.AWAITING_CONFIRM,
                SwapStatus.AWAITING_BLOCK_MINING,
            ].includes(this._swapStatus)
        );
    }

    public get swapStatus(): SwapStatus {
        return this._swapStatus;
    }

    private set isInitialized(value: boolean) {
        this._isInitialized = value;
    }

    private set exchangeRate(value: number) {
        this._exchangeRate = value;
    }

    private set swapStatus(value: SwapStatus) {
        this._swapStatus = value;
    }
}
