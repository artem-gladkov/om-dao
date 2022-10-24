import {FC, useCallback, useState} from 'react'
import classNames from 'classnames'

import styles from './WalletConnectForm.module.scss'
import {Wallets} from "../Wallets";
import {Container} from "../../../../shared/ui";
import {observer} from 'mobx-react-lite';
import {useEthereumStore} from "../../../../entities";
import {WalletConnectionStore} from "../../model/wallet-connection.store";

export interface WalletConnectFormProps {
  className?: string
}

export const WalletConnectForm: FC<WalletConnectFormProps> = observer(({className, ...otherProps}) => {
  const {ethereumStore} = useEthereumStore()
  const [{connectWallet}] = useState(() => new WalletConnectionStore(ethereumStore))

  return (
    <div className={classNames(styles.walletConnectForm, className)} {...otherProps}>
      <Container>
        <div className={styles.body}>
          <h2>Подключить кошелек</h2>
          <Wallets onClickWallet={connectWallet}/>
        </div>
      </Container>
    </div>
  )
})

