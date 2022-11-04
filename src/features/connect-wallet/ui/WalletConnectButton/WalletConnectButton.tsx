import {FC, useState} from 'react'
import classNames from 'classnames'

import styles from './WalletConnectButton.module.scss'
import {useEthereumStore} from "../../../../entities";
import {observer} from 'mobx-react-lite';
import {WalletConnectionStore} from "../../model";
import {Button} from '../../../../shared/ui';

export interface WalletConnectButtonProps {
  className?: string
}

export const WalletConnectButton: FC<WalletConnectButtonProps> = observer(({className, ...otherProps}) => {
  const {ethereumStore} = useEthereumStore()
  const [{connectWallet}] = useState(() => new WalletConnectionStore(ethereumStore))

  return (

    <Button onClick={connectWallet} className={classNames(styles.walletConnectButton, className)} {...otherProps}>
      Подключить кошелек
    </Button>
  )
})

