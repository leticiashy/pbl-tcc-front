import { mapActions } from "vuex";

const LanguagesMixin = {
  computed: {
    actualLang: function() {
      const actualLang =
        this.languages.find(lang => lang.code === this.$i18n.locale) || {};

      this.setActualLanguage(actualLang);

      return actualLang;
    },
    globalLocale: function() {
      const globalLocale =
        this.actualLang && this.actualLang.locale
          ? this.actualLang.locale
          : "en";

      this.setGlobalLocale(globalLocale);

      return globalLocale;
    },
    languages: function() {
      return [
        {
          code: "en",
          locale: "en",
          title: this.$t("GLOBAL.LANG_ENGLISH"),
          image: "um-round"
        },
        {
          code: "uk",
          locale: "en",
          title: this.$t("GLOBAL.LANG_ENGLISH_UK"),
          image: "gb-round"
        },
        {
          code: "pt",
          locale: "pt",
          title: this.$t("GLOBAL.LANG_PORTUGUESE"),
          image: "br-round"
        },
        {
          code: "es",
          locale: "es",
          title: this.$t("GLOBAL.LANG_SPANISH"),
          image: "es-round"
        },
        {
          code: "de",
          locale: "de",
          title: this.$t("GLOBAL.LANG_GERMAN"),
          image: "de-round"
        },
        {
          code: "fr",
          locale: "fr",
          title: this.$t("GLOBAL.LANG_FRENCH"),
          image: "fr-round"
        }
      ];
    }
  },
  methods: mapActions(["setGlobalLocale", "setActualLanguage"])
};

export default LanguagesMixin;
