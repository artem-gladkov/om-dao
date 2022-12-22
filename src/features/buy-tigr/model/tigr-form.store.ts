import { makeAutoObservable } from "mobx";
import { Contract } from "@ethersproject/contracts";
import { TOKEN_ABI, TOKEN_ADDRESS } from "../../../entities";
import { BaseTokensFormSubmitData } from "../../base-tokens-form";
import { TIGR_SWAP_CONTRACT_DATA } from "../constants";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { SwapStatus } from "../../swap-tokens";
import { RootStore } from "../../../app/root-store";

export class TigrFormStore {
  private _exchangeRate: number = 0;

  private _isInitialized: boolean = false;

  private _swapStatus: SwapStatus = SwapStatus.READY;

  private _maxCount: string = "0"

  constructor(private _rootStore: RootStore) {
    makeAutoObservable(this);

    this.init();
  }

  private init = async () => {
    try {
      const bigNumber = await this._swapContract.PriceomdwTigr();
      this._exchangeRate = +formatUnits(bigNumber, "6");


      const maxCount = await this._destinationContract.balanceOf(
          this._swapContract.address
      );

      this._maxCount = formatUnits(
          maxCount,
          await this._destinationContract.decimals()
      );
    } catch (e) {
      console.log(e);
    } finally {
      this.isInitialized = true;
    }
  };

  public onSubmit = async ({ sourceAmount }: BaseTokensFormSubmitData) => {
    this.swapStatus = SwapStatus.STARTING;

    try {
      const decimals = await this._sourceContract.decimals();
      const unit256Amount = parseUnits(sourceAmount, decimals);

      this.swapStatus = SwapStatus.AWAITING_CONFIRM;
      const approveTransaction = await this._sourceContract.approve(
        this._swapContract.address,
        unit256Amount
      );

      this.swapStatus = SwapStatus.AWAITING_BLOCK_MINING;
      await approveTransaction.wait();

      this.swapStatus = SwapStatus.AWAITING_CONFIRM;
      const buyTransaction = await this._swapContract.buyToken(unit256Amount);

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

  public get _sourceContract(): Contract {
    return new Contract(
      TOKEN_ADDRESS.OMD,
      TOKEN_ABI.OMD,
      this._rootStore.signerOrProvider
    );
  }

  public get _destinationContract(): Contract {
    return new Contract(
      TOKEN_ADDRESS.omdwTigr,
      TOKEN_ABI.omdwTigr,
      this._rootStore.signerOrProvider
    );
  }

  public get _swapContract(): Contract {
    return new Contract(
      TIGR_SWAP_CONTRACT_DATA.address,
      TIGR_SWAP_CONTRACT_DATA.abi,
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

  public get maxCount(): string {
    return this._maxCount;
  }

  private set isInitialized(value: boolean) {
    this._isInitialized = value;
  }

  private set swapStatus(value: SwapStatus) {
    this._swapStatus = value;
  }
}
