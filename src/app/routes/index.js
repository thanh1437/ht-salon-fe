import { routes } from "../config";
import { DefaultLayout, Admin } from "../layouts/index";
import History from "../pages/History";
import Booking from "../pages/Booking";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

export const publicRoutes = [
  { path: routes.home, component: Home, layout: DefaultLayout },
  { path: routes.history, component: History, layout: DefaultLayout },
  { path: routes.booking, component: Booking, layout: DefaultLayout },

  { path: routes.admin.dashboard, component: Dashboard, layout: Admin },
];
export const privateRoutes = [];
