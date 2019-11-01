import VueI18n from "vue-i18n";
import Helpers from "@/helpers";

const availableLangs = ["en", "es", "pt"];

let i18n = null;

export default class LanguagesManager {
  constructor(ctx, languages, userLang) {
    if (!i18n) {
      const currentLang = userLang || LanguagesManager.getCurrentLanguage();

      LanguagesManager.setLanguage(currentLang);

      i18n = new VueI18n({
        locale: currentLang,
        messages: languages,
        silentTranslationWarn: true
      });

      ctx.i18n = i18n;
    }

    this.i18n = i18n;
  }

  static getCurrentLanguage() {
    const queryLang = Helpers.getParameterByName("lang");
    const storageLang = localStorage.getItem("currentLang");
    const browserLang = (
      navigator.language ||
      navigator.userLanguage ||
      ""
    ).split(/[-_]+/)[0];

    // Irá retornar na ordem de prioridade a primeira linguagem que for válida
    // Ordem de prioridade:
    //   QueryParam > LocalStorage > Browser > Inglês padrão
    let currentLang = [queryLang, storageLang, browserLang, "en"].find(
      language => availableLangs.includes(language)
    );

    return currentLang;
  }

  static setLanguage(userLang) {
    // necessario para quando abre em aba anonima pela primeira vez!
    setTimeout(() => {
      localStorage.setItem("currentLang", userLang);
    });
  }

  static getI18nService() {
    if (!i18n) {
      console.error("ERROR: i18n service hasn't been set");
    }

    return i18n;
  }
}
