import { Home, Person, SchoolRounded, Category } from "@mui/icons-material";
import { routes } from "./config";

export const navigation = [
  {
    title: "Dashboard",
    icon: <Home />,
    path: routes.admin.dashboard,
    roles: ["ROLE_ADMIN", "ROLE_EMPLOYEE"],
    children: null,
  },
  {
    title: "Quản lý dịch vụ",
    icon: <SchoolRounded />,
    path: routes.admin.services,
    roles: ["ROLE_ADMIN"],
    children: null,
  },
  {
    title: "Quản lý combo",
    icon: <SchoolRounded />,
    path: routes.admin.combos,
    roles: ["ROLE_ADMIN"],
    children: null,
  },
  {
    title: "Quản lý lịch cắt tóc",
    icon: <Category />,
    path: routes.admin.calendar,
    roles: ["ROLE_ADMIN", "ROLE_EMPLOYEE"],
    children: null,
  },
  {
    title: "Quản lý tài khoản",
    icon: <Person />,
    path: routes.admin.accounts,
    roles: ["ROLE_ADMIN"],
    children: null,
  },
];
