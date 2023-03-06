import { routes } from "../config";
import { DefaultLayout, Admin } from "../layouts/index";
import History from "../pages/History";
import Booking from "../pages/Booking";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ServiceList from "../pages/Admin/ServiceList";
import ComboList from "../pages/Admin/ComboList";
import BookingListAdmin from "../pages/Admin/BookingListAdmin";

export const publicRoutes = [
  { path: routes.home, component: Home, layout: DefaultLayout },
  { path: routes.history, component: History, layout: DefaultLayout },
  { path: routes.booking, component: Booking, layout: DefaultLayout },

  { path: routes.admin.dashboard, component: Dashboard, layout: Admin },
  { path: routes.admin.services, component: ServiceList, layout: Admin },
  { path: routes.admin.combos, component: ComboList, layout: Admin },
  { path: routes.admin.calendar, component: BookingListAdmin, layout: Admin },
];
export const privateRoutes = [];
