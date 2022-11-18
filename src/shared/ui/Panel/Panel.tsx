import { FC, HTMLProps } from "react";
import classNames from "classnames";

export interface IPanelProps extends HTMLProps<HTMLDivElement> {}

export const Panel: FC<IPanelProps> = ({
  className,
  children,
  ...otherProps
}) => (
  <div
    className={classNames(className, "p-2 bg-gray-400 rounded")}
    {...otherProps}
  >
    {children}
  </div>
);
