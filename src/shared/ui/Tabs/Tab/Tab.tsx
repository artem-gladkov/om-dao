import { FC } from "react";
import classNames from "classnames";

import styles from "./Tab.module.scss";

export interface ITabProps {
  className?: string;
  label: string;
  key: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export const Tab: FC<ITabProps> = ({ className, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.tab, className, { [styles.active]: active })}
    >
      {label}
    </button>
  );
};
