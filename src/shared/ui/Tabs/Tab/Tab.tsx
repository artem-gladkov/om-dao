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
  title?: string;
}

export const Tab: FC<ITabProps> = ({
  className,
  label,
  active,
  onClick,
  disabled,
  ...otherProps
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(styles.tab, className, {
        [styles.active]: active,
        [styles.disabled]: disabled,
      })}
      {...otherProps}
    >
      {label}
    </button>
  );
};
