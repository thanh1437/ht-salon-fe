const APPLICATION_PATH = "/";

module.exports = Object.freeze({
  ROOT_PATH: APPLICATION_PATH,
  API_ENDPOINT: "https://ht-salon-be.herokuapp.com/api",
  IMAGE_PATH: process.env.PUBLIC_URL + "/assets/image",
  LOGIN_PAGE: APPLICATION_PATH + "sign-in",
  HOME_PAGE: APPLICATION_PATH,
});
