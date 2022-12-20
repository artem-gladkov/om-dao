import { makeAutoObservable } from "mobx";

export class RootStore {
  private _isAppInitialized: boolean = false;

  private _refCode: string | undefined;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  protected init = () => {
    try {
      const refcode = localStorage.getItem("refcode");
      if (refcode === null) {
        localStorage.setItem("refcode", "base");
        this._refCode = "base";
      }
      if (refcode) {
        this._refCode = refcode;
      }
    } catch (e) {
      console.log(e);
    } finally {
      this._isAppInitialized = true;
    }
  };

  get isAppInitialized(): boolean {
    return this._isAppInitialized;
  }

  public setRefCode = (refcode: string | undefined): void => {
    this._refCode = refcode;
  };

  public get refCode(): string | undefined {
    return this._refCode;
  }
}
