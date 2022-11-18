import { FC } from "react";
import { Button } from "../../../shared/ui";
import { NETWORK_NAMES } from "../../../shared/constants";
import { AVAILABLE_NETWORK } from "../../../shared/config";
import { useEthereumStore } from "../../../entities";

export interface IWrongNetworkOverlayProps {}

export const WrongNetworkOverlay: FC<IWrongNetworkOverlayProps> = () => {
  const {
    ethereumStore: { changeToAvailableNetwork },
  } = useEthereumStore();

  return (
    <div className="container p-4 mx-auto max-w-5xl flex flex-col items-center justify-center h-full text-center">
      <h2>
        Для работы приложения необходима сеть {NETWORK_NAMES[AVAILABLE_NETWORK]}
      </h2>
      <Button className="w-full" onClick={changeToAvailableNetwork}>
        Сменить сеть на {NETWORK_NAMES[AVAILABLE_NETWORK]}
      </Button>
    </div>
  );
};
