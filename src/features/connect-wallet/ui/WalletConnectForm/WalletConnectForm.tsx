import { FC, useState } from "react";

import { Wallets } from "../Wallets";
import { observer } from "mobx-react-lite";
import { useEthereumStore } from "../../../../entities";
import { WalletConnectionStore } from "../../model";

export const WalletConnectForm: FC = observer(() => {
  const { ethereumStore } = useEthereumStore();
  const [{ connectWallet }] = useState(
    () => new WalletConnectionStore(ethereumStore)
  );

  return (
    <>
      <h2 className="mb-4">Подключить кошелек</h2>
      <Wallets onClickWallet={connectWallet} />
    </>
  );
});
