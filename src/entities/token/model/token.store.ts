import { makeAutoObservable } from "mobx";
import { BaseTokenInfo } from "../types";
import {
  TOKEN_ADDRESS,
  TOKEN_DECIMAL,
  TOKEN_NAME,
  TOKEN_SYMBOLS,
} from "../../ethereum/constants/tokens-data";

export class TokenStore {
  private _decimals: string = "";

  private _address: string = "";

  private _name: string = "";

  constructor(private _symbol: TOKEN_SYMBOLS) {
    makeAutoObservable(this);

    this.name = TOKEN_NAME[_symbol];
    this.decimals = TOKEN_DECIMAL[_symbol];
    this.address = TOKEN_ADDRESS[_symbol];
  }

  public get address(): string {
    return this._address;
  }

  private set address(value: string) {
    this._address = value;
  }

  private set decimals(value: string) {
    this._decimals = value;
  }

  private set name(value: string) {
    this._name = value;
  }

  public get decimals(): string {
    return this._decimals;
  }

  public get name(): string {
    return this._name;
  }

  public get symbol(): string {
    return this._symbol;
  }

  public get baseTokenInfo(): BaseTokenInfo {
    return {
      name: this.name,
      symbol: this.symbol,
      decimals: this.decimals,
      address: this.address,
    };
  }
}
