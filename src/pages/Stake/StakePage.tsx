import React, { FC, useState } from "react";

import { StakeForm } from "../../features/stake-token";
import { Tabs } from "../../shared/ui";
import { useEthereumStore } from "../../entities";
import { Navigate } from "react-router";
import { PATHS } from "../../router";
import { UnStakeForm } from "../../features/unstake-token";

export const StakePage: FC = ({}) => {
  const {
    ethereumStore: { hasSigner },
  } = useEthereumStore();
  const [activeTab, setActiveTab] = useState("stake");

  return hasSigner ? (
    <>
      <Tabs
        className="mb-4"
        activeKey={activeTab}
        items={[
          { label: "Cтейкинг", key: "stake" },
          { label: "Вывести из стейкинга", key: "unStake" },
        ]}
        onChange={setActiveTab}
      />
      <div>
        {activeTab === "stake" && <StakeForm />}
        {activeTab === "unStake" && <UnStakeForm />}
      </div>
    </>
  ) : (
    <Navigate to={PATHS.ROOT} />
  );
};
