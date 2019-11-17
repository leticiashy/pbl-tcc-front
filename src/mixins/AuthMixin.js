import AuthService from "@/services/AuthService";

const AuthMixin = {
  data() {
    return {
      authService: new AuthService()
    };
  },
  computed: {},
  methods: {
    getUser: function() {
      return this.authService.getCurrentUser();
    },
    canShow: function(permissions = []) {
      if (permissions.length > 0) {
        const user = this.authService.getCurrentUser();

        return permissions.indexOf(user.role) > -1;
      }

      return true;
    },
    isOwner: function(user_id) {
      const user = this.authService.getCurrentUser();

      return user.id === user_id;
    },
    validateRole(role = "") {
      const user = this.authService.getCurrentUser();

      switch (role) {
        case "user":
          return ["admin", "manager", "user"].indexOf(user.role) > -1;
        case "manager":
          return ["admin", "manager"].indexOf(user.role) > -1;
        case "admin":
          return ["admin"].indexOf(user.role) > -1;
        default:
          return true;
      }
    }
  }
};

export default AuthMixin;
