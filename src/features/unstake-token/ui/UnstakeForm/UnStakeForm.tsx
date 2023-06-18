import { FC, useState } from "react";

import { Button, Loader } from "../../../../shared/ui";
import { observer } from "mobx-react-lite";
import { UnstakeFormStore } from "../../model";
import { useAccount } from "wagmi";
import { Web3Button } from "@web3modal/react";
import { useSignerStore } from "../../../../entities/signer";
import { useRootStore } from "../../../../app/use-root-store";
import { useTranslation } from "react-i18next";

export const UnStakeForm: FC = observer(() => {
  const { t } = useTranslation();
  const rootStore = useRootStore();
  const { isConnected } = useAccount();

  const [
    {
      inStake,
      dividends,
      formattedUnstakeDate,
      totalAmount,
      isLoading,
      onUnStake,
      status,
      isUnStakeDisabled,
    },
  ] = useState(() => new UnstakeFormStore(rootStore));


  const loadingText = t(`common.unStakeStatus.${status}`)
  return (
    <div className="grid gap-4">
      <h2>{t("common.unStake")}</h2>
      {isLoading ? (
        <Loader text={loadingText} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-2 border rounded p-4">
            <div className="grid grid-cols-2 gap-3">
              <p>{t("common.stakePage.inStake")}:</p>
              <span>{inStake}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <p>{t("common.stakePage.currentDividends")}:</p>
              <span>{dividends}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <p>{t("common.stakePage.total")}:</p>
              <span>{totalAmount}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <p>{t("common.stakePage.date")}:</p>
              <span>{formattedUnstakeDate}</span>
            </div>
          </div>
          {isConnected ? (
            <Button onClick={onUnStake} full disabled={isUnStakeDisabled}>
              Вывод токена из стейкинга
            </Button>
          ) : (
            <Web3Button label={t("common.connectWallet")} />
          )}
        </>
      )}
    </div>
  );
});
