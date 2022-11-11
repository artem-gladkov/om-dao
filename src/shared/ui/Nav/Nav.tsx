import React, { FC } from "react";
import classNames from "classnames";

import styles from "./Nav.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { PATHS } from "../../../router";
import { useEthereumStore } from "../../../entities";

export interface INavProps {
  className?: string;
}

export const Nav: FC<INavProps> = ({ className, ...otherProps }) => {
  const { pathname } = useLocation();

  return (
    <nav className={classNames(styles.nav, className)} {...otherProps}>
      <NavLink
        className={classNames(styles.navLink, {
          [styles.active]: pathname === PATHS.ROOT,
        })}
        to={PATHS.ROOT}
      >
        Обмен
      </NavLink>
      <NavLink
        className={classNames(styles.navLink, {
          [styles.active]: pathname === PATHS.STAKE,
        })}
        to={PATHS.STAKE}
      >
        Стейкинг/Вывод из стейкинга
      </NavLink>
    </nav>
  );
};
