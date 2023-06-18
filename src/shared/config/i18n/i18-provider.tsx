import { FC, ReactNode, useState} from "react";
import {I18nextProvider} from "react-i18next";
import {createI18n} from "./i18n";


export interface I18NProviderProps {
    children: ReactNode | ReactNode[]
}

export const I18NProvider: FC<I18NProviderProps> = ({ children }) => {
    const [i18n] = useState(() => createI18n())

    return (
        <I18nextProvider i18n={i18n} defaultNS="translation">
            {children}
        </I18nextProvider>
    );
};
