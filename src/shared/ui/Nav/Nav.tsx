import React, { FC, useMemo } from "react";
import classNames from "classnames";

import styles from "./Nav.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { PATHS } from "../../../router";
import {useTranslation} from "react-i18next";

export interface INavProps {}

export const Nav: FC<INavProps> = () => {
  const { pathname: currentPathName } = useLocation();
  const { t } = useTranslation()

  const links: {pathName: string, label: string}[] = useMemo(() => {
    return Object.entries(PATHS)
        .filter(([key]) => key !== "REFERRAL")
        .map(([key, value]) => {
          return { pathName: value, label: t(`common.routes.${key.toLowerCase()}`)}
        })
  }, [t])

  return (
    <nav className={styles.nav}>
      {links.map(({ label, pathName }) => (
        <NavLink
          key={pathName}
          className={classNames(styles.navLink, {
            [styles.active]: currentPathName === pathName,
          })}
          to={pathName}
        >
          {label}
          </NavLink>
      ))}
    </nav>
  );
};
