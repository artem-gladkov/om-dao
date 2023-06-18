import React, { FC, useState } from "react";

import { StakeForm } from "../../features/stake-token";
import { Tabs } from "../../shared/ui";
import { UnStakeForm } from "../../features/unstake-token";
import { TokenAddButtons } from "../../features/add-token-to-metamask";
import { ModalTerms } from "../../features/show-terms";
import { useTranslation } from 'react-i18next';

export const StakePage: FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("stake");

  return (
    <div className="flex flex-col mx-auto max-w-2xl h-full">
      <div className="flex flex-col grow">
        <Tabs
          className="mb-4"
          activeKey={activeTab}
          items={[
            { label: t("common.stake"), key: "stake" },
            { label: t("common.unStake"), key: "unStake" },
          ]}
          onChange={setActiveTab}
        />
        <div>
          {activeTab === "stake" && <StakeForm />}
          {activeTab === "unStake" && <UnStakeForm />}
        </div>
      </div>
      <TokenAddButtons className="pb-4" />
      <ModalTerms />
    </div>
  );
};
