export const PATHS: { [key: string]: string } = {
  ROOT: "/",
  STAKE: "/stake",
  PROJECTS: "/projects",
};

export const PATH_LABEL: { [key in keyof typeof PATHS]: string } = {
  ROOT: "Обмен",
  STAKE: "Стейкинг",
  PROJECTS: "Проекты",
};
