import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../widgets/header";
import { Footer } from "../../widgets/footer";
import { useEthereumStore } from "../../entities";
import { ReactComponent as BgSvg } from "../../app/images/bg.svg";

import styles from "./RootLayout.module.scss";
import { observer } from "mobx-react-lite";

export interface IRootProps {}

export const RootLayout: FC<IRootProps> = observer(() => {
  const {
    ethereumStore: { initialized },
  } = useEthereumStore();

  return (
    <>
      {initialized && (
        <div className={styles.app}>
          <Header />
          <Outlet />
          <Footer />
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
});
