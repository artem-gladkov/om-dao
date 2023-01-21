import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../widgets/header";
import { observer } from "mobx-react-lite";
import { Background } from "./Background";

export interface IRootProps {}

export const RootLayout: FC<IRootProps> = observer(() => (
  <div className="flex flex-col relative w-full h-full">
    <Header />
    <main className="container mx-auto grow px-4 pt-8">
      <Outlet />
    </main>
    <Background />
  </div>
));
