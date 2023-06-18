import { FC } from "react";
import { Project } from "./Project";

import { TOKEN_SYMBOLS, TOKEN_HREF, TOKEN_TITLE } from "../../../entities";
import { useTranslation } from 'react-i18next';

export const WaitingProjects: FC = () => {
  const {t} = useTranslation()

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Project buttonName={t("common.show")} title={TOKEN_TITLE[TOKEN_SYMBOLS.CR]} symbol={TOKEN_SYMBOLS.CR} href={TOKEN_HREF[TOKEN_SYMBOLS.CR]} />
      <Project buttonName={t("common.show")} title={TOKEN_TITLE[TOKEN_SYMBOLS.CONS]} symbol={TOKEN_SYMBOLS.CONS} href={TOKEN_HREF[TOKEN_SYMBOLS.CONS]} />
      <Project buttonName={t("common.show")} title={TOKEN_TITLE[TOKEN_SYMBOLS.CONT]} symbol={TOKEN_SYMBOLS.CONT} href={TOKEN_HREF[TOKEN_SYMBOLS.CONT]} />
      <Project buttonName={t("common.show")} title={TOKEN_TITLE[TOKEN_SYMBOLS.DELC]} symbol={TOKEN_SYMBOLS.DELC} href={TOKEN_HREF[TOKEN_SYMBOLS.DELC]} />
      <Project buttonName={t("common.show")} title={TOKEN_TITLE[TOKEN_SYMBOLS.CHAI]} symbol={TOKEN_SYMBOLS.CHAI} href={TOKEN_HREF[TOKEN_SYMBOLS.CHAI]} />
      <Project buttonName={t("common.show")} title={TOKEN_TITLE[TOKEN_SYMBOLS.MAGIC]} symbol={TOKEN_SYMBOLS.MAGIC} href={TOKEN_HREF[TOKEN_SYMBOLS.MAGIC]} />
      <Project buttonName={t("common.show")} title={TOKEN_TITLE[TOKEN_SYMBOLS.ARA]} symbol={TOKEN_SYMBOLS.ARA} href={TOKEN_HREF[TOKEN_SYMBOLS.ARA]} />
    </div>
  );
};
