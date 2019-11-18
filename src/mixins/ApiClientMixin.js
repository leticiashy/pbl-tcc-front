import ApiClient from "@/services/ApiClient";

const ApiClientMixin = {
  data() {
    return {
      apiClient: new ApiClient(),
    };
  },
};

export default ApiClientMixin;
