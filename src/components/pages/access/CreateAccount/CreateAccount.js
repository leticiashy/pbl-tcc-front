import AuthService from "@/services/AuthService";
import ValidationMixin from "@/mixins/ValidationMixin";
import { mapState } from "vuex";
import LanguageChanger from "@/components/shared/ui/LanguageChanger";

export default {
  name: "Login",
  mixins: [ValidationMixin],
  components: {
    LanguageChanger
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
        username: ""
      },
      errors: [],
      returnUrl: this.$route.query.returnUrl || "/",
      authService: new AuthService()
    };
  },
  mounted() {
    this.authService.logout();
  },
  computed: mapState(["loading"]),
  methods: {
    onLogin: function(evt) {
      evt.preventDefault();
      const context = this;

      if (this.$refs.loginForm.validate()) {
        context.authService
          .create(
            context.login.email,
            context.login.password,
            context.login.username
          )
          .then(() => {
            context.authService
              .login(context.login.email, context.login.password)
              .then(() => {
                if (context.returnUrl && context.returnUrl != "/") {
                  context.$router.push(context.returnUrl);
                } else {
                  context.$router.push("/dashboard");
                }
              });
          })
          .catch(resp => {
            console.log(resp);
            context.errors = resp.body.errors;
          });
      }
    }
  }
};
