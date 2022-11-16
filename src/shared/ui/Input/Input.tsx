import { FC, HTMLProps, MouseEvent, ChangeEvent } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";

export interface IInputProps
  extends Omit<HTMLProps<HTMLInputElement>, "onChange"> {
  label?: string;
  onChange?: (value: string) => void;
}

export const Input: FC<IInputProps> = ({
  className,
  label,
  readOnly,
  onClick,
  onChange,
  value,
  disabled,
  ...otherProps
}) => {
  const handleClickInput = (event: MouseEvent<HTMLInputElement>) => {
    if (!readOnly) {
      onClick && onClick(event);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.currentTarget.value);
  };

  return (
    <input
      className={classNames(styles.input, className)}
      readOnly={readOnly}
      onClick={handleClickInput}
      onChange={handleChange}
      value={value}
      disabled={disabled}
      {...otherProps}
    />
  );
};
