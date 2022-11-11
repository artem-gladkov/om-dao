import { makeAutoObservable } from "mobx";
import { Ethereum, TokenStore } from "../../../entities";
import { TOKEN_SYMBOLS } from "../../../entities";

export class TokenAddButtonStore {
  private readonly _baseTokenInfo: TokenStore;

  constructor(
    private _tokenSymbol: TOKEN_SYMBOLS,
    private readonly _ethereum: Ethereum
  ) {
    makeAutoObservable(this);
    this._baseTokenInfo = new TokenStore(this._tokenSymbol);
  }

  public addToken = () => {
    try {
      this._ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: this.baseTokenInfo.address,
            symbol: this.baseTokenInfo.symbol,
            decimals: this.baseTokenInfo.decimals,
            image: "",
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  private get baseTokenInfo(): TokenStore {
    return this._baseTokenInfo;
  }
}
