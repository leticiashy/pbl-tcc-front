//import axios from "axios";
import Vue from "vue";
import LanguagesManager from "@/services/LanguagesManager";

const mockedStore = {
  commit: () => {}
};

export default class ApiClient {
  constructor() {}

  getStore() {
    // IPC(*): Precisa disso pois certas páginas carregam o ApiClient antes de instanciar o Vue
    return window.__appStore ? window.__appStore : mockedStore;
  }

  setLangInterceptor() {
    return (request, next) => {
      const currentLang = LanguagesManager.getCurrentLanguage() || "en";
      request.headers.set("lang", currentLang);
      next();
    };
  }

  setHeaders(removeContentType = false, showLoading = true) {
    const headersConfig = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      showLoading: showLoading ? "1" : "0" // tem q ser string
    };

    if (removeContentType) {
      delete headersConfig["Content-Type"];
    }

    return headersConfig;
  }

  setFileToBody(body, files = []) {
    let bodyToSend = body;

    if (files && files.length > 0) {
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i], files[i].fileName || files[i].name);
      }

      // temos q dar o append numa chave e nao append de cada tipo por vez,
      // senao ele adiciona tudo como tipo string e isso gera inconsistencias
      formData.append("json", JSON.stringify(body));
      bodyToSend = formData;
    }

    return bodyToSend;
  }

  callWS(
    method,
    url,
    data,
    files = null,
    showException = true,
    showLoading = true
  ) {
    return new Promise((resolve, reject) => {
      let bodyToSend = this.setFileToBody(data, files);

      let headers = this.setHeaders(false, showLoading);

      if (files) {
        headers = this.setHeaders(true, showLoading);
      }

      const event = Object.assign({}, bodyToSend);
      event.showLoading = showLoading;
      event.requestId = new Date().getTime();

      if (Vue.$globalEvent) {
        Vue.$globalEvent.$emit("httpRequestStart", event);
      }

      const store = this.getStore();

      store.commit("loader/START_LOADING", event);

      Vue.http.interceptors.push(this.setLangInterceptor());
      Vue.http({
        method: method,
        url: `${process.env.API_BASE_URL}${url}`,
        body: bodyToSend,
        headers: headers
      })
        .then(resp => {
          if (Vue.$globalEvent) {
            Vue.$globalEvent.$emit("httpRequestEnd", resp.body || resp);
          }

          event.response = resp;
          store.commit("loader/FINISH_LOADING", event);

          resolve(resp.body || resp);
        })
        .catch(err => {
          this.handleError(err, method, showException);
          if (Vue.$globalEvent) {
            Vue.$globalEvent.$emit("httpRequestEnd", err);
          }

          event.response = err;
          store.commit("loader/FINISH_LOADING", event);

          return reject(err);
        });
    });
  }

  get(url, showException = true, showLoading = true) {
    return this.callWS("GET", url, null, null, showException, showLoading);
  }

  post(url, data, files = null, showException = true, showLoading = true) {
    return this.callWS("POST", url, data, files, showException, showLoading);
  }

  put(url, data, files = null, showException = true, showLoading = true) {
    return this.callWS("PUT", url, data, files, showException, showLoading);
  }

  delete(url, showException = true, showLoading = true) {
    return this.callWS("DELETE", url, null, showException, showLoading);
  }

  handleError(error, operation = "operation", showException = true) {
    if (error) {
      error.operation = operation;
      error.showException = showException;
      if (Vue.$globalEvent) {
        Vue.$globalEvent.$emit("httpError", error);
      }
    }
  }

  downLoadFile(
    path,
    fileName = "export.csv",
    contentType = "text/csv; charset=utf-8"
  ) {
    Vue.http
      .get(`${process.env.VUE_APP_BASE_URI}${path}`, {
        responseType: "arraybuffer",
        headers: this.setHeaders(false, false)
      })
      .then(response => {
        if (response.data) {
          this.makeDownLoadFile(response.data, fileName, contentType);
        }
      });
  }

  /**
   * Methodo usado para fazer download do Arquivo
   * @param data - Array Buffer do arquivo
   * @param type - tipo do arquivo.
   */
  makeDownLoadFile(data, fileName, type) {
    const a = document.createElement("a");
    document.body.appendChild(a);

    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = fileName;
    a.click();

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
}
