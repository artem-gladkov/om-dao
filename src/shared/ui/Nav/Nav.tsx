import React, { FC } from "react";
import classNames from "classnames";

import styles from "./Nav.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { PATHS, PATH_LABEL } from "../../../router";

export interface INavProps {}

export const Nav: FC<INavProps> = () => {
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav}>
      {Object.entries(PATHS).filter((item) => (item[0]!=="STAKE")).map(([key, value]) => (
        <NavLink
          key={key}
          className={classNames(styles.navLink, {
            [styles.active]: pathname === value,
          })}
          to={value}
        >
          {PATH_LABEL[key]}
          </NavLink>
      ))}
    </nav>
  );
};
