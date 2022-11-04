import React, {FC, HTMLProps, useState} from 'react'
import classNames from 'classnames'

import styles from './StakePage.module.scss'
import {StakeForm} from "../../features/stake-token";
import {Container, Tabs} from '../../shared/ui';
import { useEthereumStore} from "../../entities";
import {Navigate} from "react-router";
import {PATHS} from "../../router";
import {UnStakeForm} from "../../features/unstake-token";

export interface StakePageProps extends HTMLProps<any> {
}

export const StakePage: FC<StakePageProps> = ({
  className,
  children,
  ...otherProps
}) => {
  const {ethereumStore: {hasSigner}} = useEthereumStore()
  const [activeTab, setActiveTab] = useState('stake')

  return hasSigner ?
    <div className={classNames(styles.stakePage, className)} {...otherProps}>
      <Container className={styles.wrapper}>
        <div className={styles.body}>
          <Tabs
            activeKey={activeTab} items={[{label: 'Cтейкинг', key: 'stake'}, {label: 'Вывести из стейкинга', key: 'unStake'}]}
            onChange={setActiveTab}
          />
          <div className={styles.form}>
            {activeTab === 'stake' && <StakeForm/>}
            {activeTab === 'unStake' && <UnStakeForm />}
          </div>
        </div>
      </Container>
    </div>
    : <Navigate to={PATHS.ROOT}/>

}

