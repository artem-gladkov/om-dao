import React, { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../widgets/header";
import { useEthereumStore } from "../../entities";
import { observer } from "mobx-react-lite";
import { Background } from "./Background";
import { useSigner } from "wagmi";

export interface IRootProps {}

export const RootLayout: FC<IRootProps> = observer(() => {
  return (
    <div className="flex flex-col relative w-full h-full">
      <Header />
      <main className="container mx-auto grow px-4 pt-8">
        <Outlet />
      </main>
      <Background />
    </div>
  );
});
