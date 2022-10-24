import {FC} from 'react'
import classNames from 'classnames'

import styles from './ExchangePage.module.scss'
import {useEthereumStore} from '../../entities'
import {SwapForm} from '../../features/swap-tokens'
import {WalletConnectForm} from '../../features/connect-wallet'
import {observer} from 'mobx-react-lite'
import {Container} from "../../shared/ui";

export interface ExchangePageProps {
  className?: string
}

export const ExchangePage: FC<ExchangePageProps> = observer(({
     className,
     ...otherProps
   }) => {
  const {ethereumStore: {hasSigner}} = useEthereumStore()

  return (
    <main className={classNames(styles.exchangePage, className)} {...otherProps}>
      <Container className={styles.wrapper}>
        {
          hasSigner
            ? <SwapForm/>
            : <WalletConnectForm />
        }
      </Container>
    </main>
  )
})

