import { Home, Person, SchoolRounded, Category } from "@mui/icons-material";
import { routes } from "./config";

export const navigation = [
  {
    title: "Dashboard",
    icon: <Home />,
    path: routes.admin.dashboard,
    children: null,
  },
  {
    title: "Quản lý dịch vụ",
    icon: <SchoolRounded />,
    path: routes.admin.services,
    children: null,
  },
  {
    title: "Quản lý combo",
    icon: <SchoolRounded />,
    path: routes.admin.combos,
    children: null,
  },
  {
    title: "Quản lý lịch cắt tóc",
    icon: <Category />,
    path: routes.admin.calendar,
    children: null,
  },
  {
    title: "Quản lý tài khoản",
    icon: <Person />,
    path: routes.admin.accounts,
    children: null,
  },
];
