import { useRootStore } from "../../../app/use-root-store";
import { ProviderStore } from "./provider-store";

export const useProviderStore = (): ProviderStore => {
  return useRootStore().providerStore;
};
