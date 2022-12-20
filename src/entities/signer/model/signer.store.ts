import { makeAutoObservable } from "mobx";

export class SignerStore {
  constructor() {
    makeAutoObservable(this);
  }
}
