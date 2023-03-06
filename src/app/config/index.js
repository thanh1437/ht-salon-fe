const ADMIN_PATH = "/admin";
export const routes = {
  home: "/",
  history: "/history",
  booking: "/booking",
  admin: {
    dashboard: ADMIN_PATH + "/dashboard",
    services: ADMIN_PATH + "/services",
    combos: ADMIN_PATH + "/combos",
    accounts: ADMIN_PATH + "/accounts",
    calendar: ADMIN_PATH + "/calendar",
  },
};
