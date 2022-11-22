import { FC, ReactNode } from "react";
import classNames from "classnames";

export interface IPanelProps {
  className?: string;
  children?: ReactNode;
}

export const Panel: FC<IPanelProps> = ({ className, children }) => (
  <div className={classNames(className, "p-4 border rounded-md")}>
    {children}
  </div>
);
