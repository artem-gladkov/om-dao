import { FC } from "react";
import classNames from "classnames";

export interface ITokenProps {
  symbol: string;
  img?: string;
  className?: string;
}

export const Token: FC<ITokenProps> = ({ className, symbol, img }) => {
  return (
    <div className={classNames(className, "flex items-center")}>
      {img ? (
        <img
          className="mr-2 max-w-8 max-h-8 rounded-full"
          src={img}
          alt={img}
        />
      ) : (
        <div className="mr-2 w-8 h-8 bg-gray-200 rounded-full " />
      )}
      <div className="">{symbol}</div>
    </div>
  );
};
