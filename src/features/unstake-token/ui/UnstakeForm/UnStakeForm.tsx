import {FC, useState} from 'react'
import classNames from 'classnames'

import styles from './UnStakeForm.module.scss'
import {Button, Loader} from "../../../../shared/ui";
import {observer} from 'mobx-react-lite';
import {UnstakeFormStore} from "../../model";
import {useEthereumStore} from "../../../../entities";

export interface IUnStakeFormProps {
  className?: string
}

export const UnStakeForm: FC<IUnStakeFormProps> = observer(({className}) => {
  const {ethereumStore: {signer}} = useEthereumStore()
  const [{
    inStake,
    dividends,
    formattedUnstakeDate,
    totalAmount,
    isLoading,
    onUnStake,
    loadingText,
    disableUnstake
  }] = useState(() => new UnstakeFormStore(signer))

  return (
    <div className={classNames(styles.unstakeForm, className)}>
      <h1 className={styles.title}>Вывести из стейкинга</h1>
      {isLoading
        ? <Loader text={loadingText}/>
        : <>
          <div className={styles.data}>
            <div className={styles.row}>
              <p>В стейкинге:</p>
              <span>{inStake}</span>
            </div>
            <div className={styles.row}>
              <p>Текущие дивиденды:</p>
              <span>{dividends}</span>
            </div>
            <div className={styles.row}>
              <p>Итого:</p>
              <span>{totalAmount}</span>
            </div>
            <div className={styles.row}>
              <p>Дата после которой можно вывести:</p>
              <span>{formattedUnstakeDate}</span>
            </div>
          </div>
          <Button onClick={onUnStake} full disabled={disableUnstake}>Вывод токена из стейкинга</Button>
        </>
      }
    </div>
  )
})

