import React, {FC, HTMLProps} from 'react'
import classNames from 'classnames'

import styles from './StakePage.module.scss'
import {StakeForm} from "../../features/stake-token";
import {Container} from '../../shared/ui';
import {TokenAddButton} from "../../features/add-token-to-metamask";
import {TOKEN_SYMBOLS} from "../../entities";

export interface StakePageProps extends HTMLProps<any> {
}

export const StakePage: FC<StakePageProps> = ({
  className,
  children,
  ...otherProps
}) => {
  return (
    <div className={classNames(styles.stakePage, className)} {...otherProps}>
      <Container className={styles.wrapper}>
        <StakeForm/>
        <TokenAddButton text={"Добавить токен OMD в MetaMask"} tokenSymbol={TOKEN_SYMBOLS.OMD}/>
        <TokenAddButton text={"Добавить токен stOMD в MetaMask"} tokenSymbol={TOKEN_SYMBOLS.STOMD}/>
      </Container>
    </div>
  )
}

