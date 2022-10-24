import React, {FC, HTMLProps} from 'react'
import {Outlet} from "react-router-dom";
import {Header} from "../../widgets/header";
import {useEthereumStore} from '../../entities';

import styles from './RootLayout.module.scss'
import {observer} from "mobx-react-lite";

export interface RootProps extends HTMLProps<any> {
}

export const RootLayout: FC<RootProps> = observer(({
  className,
  children,
  ...otherProps
}) => {
  const {ethereumStore: {initialized}} = useEthereumStore()

  return (
    <>
      {
        initialized &&
        <div className={styles.app}>
            <Header/>
            <Outlet/>
        </div>
      }
    </>
  )
})
