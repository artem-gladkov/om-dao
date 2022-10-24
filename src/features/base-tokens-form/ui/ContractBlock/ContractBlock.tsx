import {ChangeEvent, FC, useCallback} from 'react'
import classNames from 'classnames'

import styles from './ContractBlock.module.scss'
import {SmallBalance} from "../../../show-balance";
import {Contract} from "@ethersproject/contracts";

export interface ContractBlockProps {
  title: string
  token: { symbol: string, image?: string, name: string, balance: string }
  contract: Contract
  amount: string
  onChangeAmount?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
  readonlyAmount?: boolean
  className?: string
}

export const ContractBlock: FC<ContractBlockProps> = ({
                                                        token: {symbol, image, name, balance},
                                                        amount,
                                                        onChangeAmount,
                                                        readonlyAmount = false,
                                                        contract,
                                                        title,
                                                        className,
                                                        ...otherProps
                                                      }) => {
  const handleChangeSwapAmount = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeAmount && onChangeAmount(event.currentTarget.value.toString(), event)
  }, [])

  return (
    <div className={classNames(styles.swapBlock, className)} {...otherProps}>
      <div className={styles.header}>
        <div>{title}</div>
        <div>Текущий баланс: {balance}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.token}>
          <div className={styles.tokenIcon}>
            {image && <img src={image} alt={name}/>}
          </div>
          <div className={styles.tokenSymbol}>{symbol}</div>
        </div>
        <div className={styles.amount}>
          {
            readonlyAmount
              ? <span className={styles.amountValue}>{amount}</span>
              : <input
                className={styles.amountValue}
                value={amount}
                onChange={handleChangeSwapAmount}
              />
          }
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.tokenName}>{name}</div>
      </div>
    </div>
  )
}

