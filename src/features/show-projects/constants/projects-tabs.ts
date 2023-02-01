import { ITabProps } from "../../../shared/ui";

export const PROJECTS_TABS: ITabProps[] = [
  {
    label: "Активные",
    key: "activeProjects",
  },
  {
    label: "Ожидают листинга",
    key: "waitListing",
  },
  {
    label: "Архив",
    key: "archive",
    disabled: true,
    title: "Нет архивных проектов",
  },
];
