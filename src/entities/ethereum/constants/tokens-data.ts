import {
    USDT_ABI,
    OMDAO_ABI,
    OMDAO_STAKE_ABI,
    WRAPPED_TOKEN_ABI,
} from "./contracts-abi";
import { isProd } from "../../../shared/config";
import { Address } from "wagmi";

export enum TOKEN_SYMBOLS {
    USDT = "USDT",
    OMD = "OMD",
    STOMD = "stOMD",
    TIGR = "omdwTigr",
    CR = "omdwCRB",
    CONS = "omdwCons",
    CONT = "omdwCont",
    CHAI = "omdwChai",
    LED = "omdwLed",
    DELC = "omdwDelC",
}

export const TOKEN_ADDRESS: Record<TOKEN_SYMBOLS, Address> = {
    [TOKEN_SYMBOLS.USDT]: isProd()
        ? "0xdAC17F958D2ee523a2206206994597C13D831ec7"
        : "0x8B31e3910f59A0975253D3f2f6C6e7D8F7caC144",
    [TOKEN_SYMBOLS.OMD]: isProd()
        ? "0xA4282798c2199a1C58843088297265acD748168c"
        : "0x2d3F3Bf3997b5601D7f4f3E932912886C4c15F29",
    [TOKEN_SYMBOLS.STOMD]: isProd()
        ? "0x497bdbA917430E72d09993a55cdBBD411763168B"
        : "0xD9e8F04c685b2C12027f08b71e8f3fEF6a9A6668",
    [TOKEN_SYMBOLS.TIGR]: isProd()
        ? "0xe1C9624Cee6da05c80572280Bc3e3bEaEd4cd3Ef"
        : "0x9a4d39F46044400Aa48Ab528f8EC3DD3B793f885",
    [TOKEN_SYMBOLS.CR]: isProd()
        ? "0x178825587FC1A7D5D6373221182290a7A4566a0A"
        : "0x79D31450D34cad1b2ac0bB91bA6b8B7BEaDa609f",
    [TOKEN_SYMBOLS.CONS]: isProd()
        ? "0x967525A2030d6Ac7a0cBf0cb630107D8720A52Ef"
        : "0xB80470b73f685d45d5a2F8998f06085Ede2154fe",
    [TOKEN_SYMBOLS.CONT]: isProd()
        ? "0xf6d8220D1470d12F007B3540b111Eb4e7db2Adbe"
        : "0xbc0D848dAA133fa5d767b1fDa7fF774DB2Ff559e",
    [TOKEN_SYMBOLS.CHAI]: isProd()
        ? "0x1Aeb27D2F0c1861A538b289c602fFA784d3EDCB0"
        : "0x21a56167802F2387E25a45908Ca170dF5a786AE0",
    [TOKEN_SYMBOLS.LED]: isProd()
        ? "0x1D8efA821D2EDEFb7c71d79F317cDe14dEE4F748"
        : "0x62D124483252C906E8CCF02Efd893c305A25Dd42",
    [TOKEN_SYMBOLS.DELC]: isProd()
        ? "0x6E98eF583C64482a6A6b63a679197813B7c3Cd1A"
        : "0x4a8bbBaE7fac603A82707D6FE2315030a7E71a63",
};

export const TOKEN_ABI: { [key in TOKEN_SYMBOLS]: any } = {
    [TOKEN_SYMBOLS.USDT]: USDT_ABI,
    [TOKEN_SYMBOLS.OMD]: OMDAO_ABI,
    [TOKEN_SYMBOLS.STOMD]: OMDAO_STAKE_ABI,
    [TOKEN_SYMBOLS.TIGR]: WRAPPED_TOKEN_ABI,
    [TOKEN_SYMBOLS.CR]: WRAPPED_TOKEN_ABI,
    [TOKEN_SYMBOLS.CONS]: WRAPPED_TOKEN_ABI,
    [TOKEN_SYMBOLS.CONT]: WRAPPED_TOKEN_ABI,
    [TOKEN_SYMBOLS.CHAI]: WRAPPED_TOKEN_ABI,
    [TOKEN_SYMBOLS.LED]: WRAPPED_TOKEN_ABI,
    [TOKEN_SYMBOLS.DELC]: WRAPPED_TOKEN_ABI,
};

export const TOKEN_NAME: { [key in TOKEN_SYMBOLS]: string } = {
    [TOKEN_SYMBOLS.USDT]: "Tether USD",
    [TOKEN_SYMBOLS.OMD]: "OM DAO",
    [TOKEN_SYMBOLS.STOMD]: "OM DAO (Staked)",
    [TOKEN_SYMBOLS.TIGR]: "OM DAO Wrapped Tigr",
    [TOKEN_SYMBOLS.CR]: "OM DAO Wrapped Cross River Bank",
    [TOKEN_SYMBOLS.CONS]: "OM DAO Wrapped Consensys",
    [TOKEN_SYMBOLS.CONT]: "OM DAO Wrapped Contango",
    [TOKEN_SYMBOLS.CHAI]: "OM DAO Wrapped Chainalysis",
    [TOKEN_SYMBOLS.LED]: "OM DAO Wrapped Ledger",
    [TOKEN_SYMBOLS.DELC]: "OM DAO Wrapped Delegate Cash",
};

export const TOKEN_DECIMAL: { [key in TOKEN_SYMBOLS]: string } = {
    [TOKEN_SYMBOLS.USDT]: "6",
    [TOKEN_SYMBOLS.OMD]: "6",
    [TOKEN_SYMBOLS.STOMD]: "6",
    [TOKEN_SYMBOLS.TIGR]: "6",
    [TOKEN_SYMBOLS.CR]: "6",
    [TOKEN_SYMBOLS.CONS]: "6",
    [TOKEN_SYMBOLS.CONT]: "6",
    [TOKEN_SYMBOLS.CHAI]: "6",
    [TOKEN_SYMBOLS.LED]: "6",
    [TOKEN_SYMBOLS.DELC]: "6",
};

export const TOKEN_HREF: { [key in TOKEN_SYMBOLS]: string } = {
    [TOKEN_SYMBOLS.USDT]: "https://tether.to",
    [TOKEN_SYMBOLS.OMD]: "https://omdao.vc",
    [TOKEN_SYMBOLS.STOMD]: "https://omdao.vc",
    [TOKEN_SYMBOLS.TIGR]:
        "https://selectedpublic.notion.site/Tiger-Trade-a081fd79e144442dbf133a83eba5fb68",
    [TOKEN_SYMBOLS.CR]:
        "https://selectedpublic.notion.site/Cross-River-46adffcd372143f3b81e486d518ab222",
    [TOKEN_SYMBOLS.CONS]:
        "https://selectedpublic.notion.site/ConsenSys-e538fbe363ea4bbd9165a7aec7aa5fc1",
    [TOKEN_SYMBOLS.CONT]:
        "https://selectedpublic.notion.site/Contango-c61be1a2aaf4438cbb1567b25ec10275",
    [TOKEN_SYMBOLS.CHAI]:
        "https://selectedpublic.notion.site/Chainalysis-ef0d077b3c974dc49d353f5840f15475",
    [TOKEN_SYMBOLS.LED]:
        "https://www.notion.so/selectedpublic/Ledger-d1e8be65607741d0aa07c482b45333c5",
    [TOKEN_SYMBOLS.DELC]: "https://github.com/0xfoobar/delegate-cash-frontend",
};

export const TOKEN_TITLE: { [key in TOKEN_SYMBOLS]: string } = {
    [TOKEN_SYMBOLS.USDT]: "Tether",
    [TOKEN_SYMBOLS.OMD]: "OM DAO",
    [TOKEN_SYMBOLS.STOMD]: "OM DAO (Staked)",
    [TOKEN_SYMBOLS.TIGR]: "Tiger Trade",
    [TOKEN_SYMBOLS.CR]: "Cross River",
    [TOKEN_SYMBOLS.CONS]: "ConsenSys",
    [TOKEN_SYMBOLS.CONT]: "Contango",
    [TOKEN_SYMBOLS.CHAI]: "Chainalysis",
    [TOKEN_SYMBOLS.LED]: "Ledger",
    [TOKEN_SYMBOLS.DELC]: "Delegate Cash",
};
