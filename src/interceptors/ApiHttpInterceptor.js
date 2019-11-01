import TokenService from "@/services/TokenService";

const ApiHttpInterceptor = function(request) {
  const token = TokenService.getToken();

  if (token) {
    request.headers.set("Authorization", `${token}`);
  }
};

export default ApiHttpInterceptor;
