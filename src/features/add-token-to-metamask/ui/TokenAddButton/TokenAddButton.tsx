import {FC, useState} from 'react'
import classNames from 'classnames'

import styles from './TokenAddButton.module.scss'
import {TokenAddButtonStore} from '../../model'
import {useEthereumStore} from "../../../../entities";
import {observer} from "mobx-react-lite";
import {TOKEN_SYMBOLS} from "../../../../entities";
import { Button } from '../../../../shared/ui';

export interface TokenAddButtonProps {
  className?: string
  text: string,
  tokenSymbol: TOKEN_SYMBOLS,
}

export const TokenAddButton: FC<TokenAddButtonProps> = observer(({
  className,
  tokenSymbol,
  text,
  ...otherProps
}) => {
  const {ethereumStore: {ethereum}} = useEthereumStore()
  const [{addToken}] = useState(() => new TokenAddButtonStore(tokenSymbol, ethereum))

  return (
    <Button onClick={addToken} className={classNames(styles.tokenAddButton, className)} {...otherProps}>
      {text}
    </Button>
  )
})

