const ADMIN_PATH = "/admin";
export const routes = {
  home: "/",
  history: "/history",
  booking: "/booking",
  admin: {
    dashboard: ADMIN_PATH + "/dashboard",
    courses: ADMIN_PATH + "/courses",
    accounts: ADMIN_PATH + "/accounts",
    accountDetail: ADMIN_PATH + "/account-detail",
    topics: ADMIN_PATH + "/topics",
    courseDetail: ADMIN_PATH + "/course-detail",
    adminProfile: ADMIN_PATH + "/user-profile",
  },
};
