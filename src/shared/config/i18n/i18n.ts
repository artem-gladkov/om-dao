import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources"

const DEFAULT_I_18_N_OPTIONS:InitOptions = {
    resources,
    fallbackLng: "ru",
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false
    }
}
export const createI18n = (customOptions?: InitOptions ) => {
    const options:InitOptions = {...DEFAULT_I_18_N_OPTIONS, ...customOptions}
    const instance = i18n.createInstance(options)

    instance.use(initReactI18next)
    instance.init()

    return instance
}