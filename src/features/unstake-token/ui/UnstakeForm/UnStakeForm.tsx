import { FC, useState } from "react";

import { Button, Loader } from "../../../../shared/ui";
import { observer } from "mobx-react-lite";
import { UnstakeFormStore } from "../../model";
import { useEthereumStore } from "../../../../entities";

export const UnStakeForm: FC = observer(() => {
  const {
    ethereumStore: { signer },
  } = useEthereumStore();
  const [
    {
      inStake,
      dividends,
      formattedUnstakeDate,
      totalAmount,
      isLoading,
      onUnStake,
      loadingText,
      isUnStakeDisabled,
    },
  ] = useState(() => new UnstakeFormStore(signer));

  return (
    <div className="grid gap-4">
      <h2>Вывести из стейкинга</h2>
      {isLoading ? (
        <Loader text={loadingText} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-2 border rounded p-4">
            <div className="grid grid-cols-2 gap-3">
              <p>В стейкинге:</p>
              <span>{inStake}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <p>Текущие дивиденды:</p>
              <span>{dividends}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <p>Итого:</p>
              <span>{totalAmount}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <p>Дата после которой можно вывести:</p>
              <span>{formattedUnstakeDate}</span>
            </div>
          </div>
          <Button onClick={onUnStake} full disabled={isUnStakeDisabled}>
            Вывод токена из стейкинга
          </Button>
        </>
      )}
    </div>
  );
});
