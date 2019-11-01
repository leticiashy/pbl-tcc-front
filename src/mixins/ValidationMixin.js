const ValidationMixin = {
  data() {
    const rules = ["required", "email", "maxValue", "minValue"].reduce(
      (acc, key) => {
        return Object.assign({}, acc, {
          [key]: this[key]
        });
      },
      {}
    );

    return {
      rules: rules
    };
  },
  methods: {
    isEmpty(value) {
      return value == null || value === "";
    },
    required(value) {
      return !this.isEmpty(value) || this.$t("GLOBAL_ERROR.REQUIRED");
    },
    email(value) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return (!!value && pattern.test(value)) || this.$t("GLOBAL_ERROR.EMAIL");
    },
    maxValue(value, max) {
      switch (typeof value) {
        case "string":
          return (
            !(value.length > parseInt(max)) || this.$t("GLOBAL_ERROR.MAX_VAL")
          );
        case "number":
          return (
            !(parseInt(value) > parseInt(max)) ||
            this.$t("GLOBAL_ERROR.MAX_VAL")
          );
      }
    },
    minValue(value, min) {
      switch (typeof value) {
        case "string":
          return (
            !(value.length < parseInt(min)) || this.$t("GLOBAL_ERROR.MIN_VAL")
          );
        case "number":
          return (
            !(parseInt(value) < parseInt(min)) ||
            this.$t("GLOBAL_ERROR.MIN_VAL")
          );
      }
    }
  }
};

export default ValidationMixin;
