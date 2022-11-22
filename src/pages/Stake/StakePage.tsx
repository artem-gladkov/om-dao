import React, { FC, useState } from "react";

import { StakeForm } from "../../features/stake-token";
import { Tabs } from "../../shared/ui";
import { UnStakeForm } from "../../features/unstake-token";

export const StakePage: FC = ({}) => {
  const [activeTab, setActiveTab] = useState("stake");

  return (
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
  );
};
