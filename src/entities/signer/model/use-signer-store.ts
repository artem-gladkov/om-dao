import { useRootStore } from "../../../app/use-root-store";
import { SignerStore } from "./signer-store";

export const useSignerStore = (): SignerStore => {
  return useRootStore().signerStore;
};
