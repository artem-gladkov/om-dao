import React, { FC } from "react";

import styles from "./Background.module.scss";
import { ReactComponent as BgSvg } from "../../../app/images/bg.svg";

export const Background: FC = () => {
  return (
    <div className={styles.bg}>
      <BgSvg className={styles.grid} />
      <div className={styles.circles}>
        <div className={styles.circle} />
        <div className={styles.circle} />
        <div className={styles.circle} />
      </div>
    </div>
  );
};
