import en from "../en";

export default Object.assign(
  {},
  en,
  require("./global.json"),
  require("./global-error.json"),
  require("./login.json")
);
