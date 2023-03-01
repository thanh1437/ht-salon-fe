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
    title: "Quản lý dịch vụ và combo",
    icon: <SchoolRounded />,
    path: routes.admin.courses,
    children: null,
  },
  {
    title: "Quản lý lịch cắt tóc",
    icon: <Category />,
    path: routes.admin.topics,
    children: null,
  },
  {
    title: "Quản lý tài khoản",
    icon: <Person />,
    path: routes.admin.accounts,
    children: null,
  },
];
