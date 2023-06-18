import { FC } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

export const ButtonChangeLanguage: FC = () => {
  const { i18n } = useTranslation();
  const onClick = (): void => {
    if (i18n.language === "ru") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ru");
    }
  };

  return (
    <button onClick={onClick}>
      <span
        className={classNames({
          "text-[#5557a4] font-bold": i18n.language === "ru",
        })}
      >
        RU&nbsp;
      </span>
      <span className="font-bold">|</span>
      <span
        className={classNames({
          "text-[#5557a4] font-bold": i18n.language === "en",
        })}
      >
        &nbsp;EN
      </span>
    </button>
  );
};
