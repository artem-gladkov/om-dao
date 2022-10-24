import {FC, useState} from 'react'
import classNames from 'classnames'

import styles from './BaseTokensForm.module.scss'
import {useEthereumStore} from "../../../../entities";
import {BaseTokensFormStore} from "../../model";
import {observer} from "mobx-react-lite";
import {SourceContract} from "../SourceContract";
import {DestinationContract} from "../DestinationContract";
import {BaseTokensFormSubmitData} from "../../types";
import {Contract} from "@ethersproject/contracts";
import {Button} from '../../../../shared/ui';
import {Arrow} from "../../../../shared/ui/Arrow";

export interface BaseTokensFormProps {
  title: string
  onSubmit: (data: BaseTokensFormSubmitData) => void
  sourceContract: Contract
  destinationContract: Contract
  isLoading: boolean
  loadingText?: string
  className?: string
  calculateDestinationAmount?: (sourceAmount: string, isRearranged: boolean) => string
}

export const BaseTokensForm: FC<BaseTokensFormProps> = observer(({
  title,
  sourceContract,
  destinationContract,
  className,
  isLoading,
  loadingText,
  onSubmit,
  calculateDestinationAmount,
  ...otherProps
}) => {
  const {ethereumStore: {signer}} = useEthereumStore()
  const [{
    fullDestinationContractInfo,
    fullSourceContractInfo,
    sourceAmount,
    onChangeSwapAmount,
    isDisabledSubmitButton,
    onRearrangeContracts,
    destinationAmount,
    isRearranged,
    isInitialized
  }] = useState(() => new BaseTokensFormStore(signer, sourceContract, destinationContract, calculateDestinationAmount))

  const onSubmitForm = () => {
    onSubmit({sourceAmount, destinationAmount, isRearranged})
  }

  return (
    <div className={classNames(styles.swapForm, className)} {...otherProps}>

      <div className={styles.wrapper}>
        {isInitialized
          ? <>
            {
              isLoading
                ? <div>{loadingText}</div>
                : <>
                  <h1>{title}</h1>
                  <SourceContract
                    fullContractInfo={fullSourceContractInfo}
                    amount={sourceAmount}
                    onChangeAmount={onChangeSwapAmount}
                  />
                  <Arrow
                    onClick={onRearrangeContracts}
                    className={styles.buttonRearrange}
                  />
                  <DestinationContract fullContractInfo={fullDestinationContractInfo} amount={destinationAmount}/>
                  <Button type='button' onClick={onSubmitForm} disabled={isDisabledSubmitButton}>Совершить сделку</Button>
                </>
            }
          </>
          : <div>Загрузка...</div>
        }

      </div>

    </div>
  )
})

