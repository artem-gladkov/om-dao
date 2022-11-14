import React, { FC, HTMLProps } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../widgets/header";
import { useEthereumStore } from "../../entities";
import { ReactComponent as BgSvg } from "../../app/images/bg.svg";

import styles from "./RootLayout.module.scss";
import { observer } from "mobx-react-lite";

export interface RootProps extends HTMLProps<any> {}

export const RootLayout: FC<RootProps> = observer(
  ({ className, children, ...otherProps }) => {
    const {
      ethereumStore: { initialized },
    } = useEthereumStore();

    return (
      <>
        {initialized && (
          <div className={styles.app}>
            <Header />
            <Outlet />
            <div className={styles.bg}>
              <BgSvg className={styles.grid} />
              <div className={styles.circles}>
                <div className={styles.circle} />
                <div className={styles.circle} />
                <div className={styles.circle} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);
