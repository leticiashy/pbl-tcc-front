import Vue from "vue";
import VueI18n from "vue-i18n";
import Helpers from "@/helpers";
import LanguagesManager from "@/services/LanguagesManager";
import Languages from "@/languages";

Vue.use(VueI18n);

const queryLang = Helpers.getParameterByName("lang");
const storageLang = localStorage.getItem("currentLang");
const browserLang = (navigator.language || navigator.userLanguage || "").split(
  /[-_]+/
)[0];

const availableLangs = Object.keys(Languages);

// Irá retornar na ordem de prioridade a primeira linguagem que for válida
// Ordem de prioridade:
//   QueryParam > LocalStorage > Browser > Inglês padrão
let currentLang = [queryLang, storageLang, browserLang, "en"].find(language =>
  availableLangs.includes(language)
);

localStorage.setItem("currentLang", currentLang);

const languagesManager = new LanguagesManager(Vue, Languages, currentLang);

export default languagesManager.i18n;
