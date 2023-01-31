import {FC, useLayoutEffect, useState} from "react";

export interface ITokenIconProps {
  tokenSymbol: string;
}

export const TokenIcon: FC<ITokenIconProps> = ({ tokenSymbol }) => {
  const [path, setPath] = useState("");

  useLayoutEffect(() => {
    updateTokenImg(tokenSymbol);
  }, [tokenSymbol]);

  const updateTokenImg = async (tokenSymbol: string) => {
    await import(
      `../../../app/images/tokens/${tokenSymbol.toLowerCase()}.webp`
    ).then((response) => {
      setPath(response.default);
    });
  };

  return path ? (
    <img
      className="mr-2 max-w-8 max-h-8 rounded-full"
      src={path}
      alt={`Символ токена ${tokenSymbol}`}
    />
  ) : (
    <div className="mr-2 w-8 h-8 bg-gray-200 rounded-full " />
  );
};
