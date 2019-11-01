import FlashMessageItem from "@/models/FlashMessageItem";
import Vue from "vue";

const MESSAGE_TIMEOUT = 8000;
let _messages = [];

export default class FlashMessageService {
  static showMessage(item) {
    let length = _messages.length;

    //Não adiciona mensagens repetidas
    if (
      length > 0 &&
      _messages[length - 1].message.toLocaleLowerCase() ===
        item.message.toLocaleLowerCase()
    ) {
      return;
    }

    _messages.push(item);

    //Evento para Notificação mensagem nova
    Vue.$globalEvent.$emit("onFlashMessage", item);

    // Some a mensagem após um tempo
    setTimeout(() => {
      const index = _messages.length - 1;
      FlashMessageService.deleteMessage(index);
    }, MESSAGE_TIMEOUT);
  }

  /**
   * @deprecated Utilize a forma correta
   * @example
   * FlashMessageService.success(message)
   */
  static sucess(message) {
    FlashMessageService.success(message);
  }

  static success(message) {
    FlashMessageService.addMessage("success", null, message, null);
  }
  static Success(title, message) {
    FlashMessageService.addMessage("success", null, message, title);
  }

  static info(message) {
    FlashMessageService.addMessage("info", null, message, null);
  }
  static Info(title, message) {
    FlashMessageService.addMessage("info", null, message, title);
  }

  static warning(message) {
    FlashMessageService.addMessage("warning", null, message, null);
  }
  static Warning(title, message) {
    FlashMessageService.addMessage("warning", null, message, title);
  }

  static error(message, trace = null) {
    FlashMessageService.addMessage("error", null, message, trace);
  }
  static Error(title, message, trace = null) {
    FlashMessageService.addMessage("error", title, message, trace);
  }

  static addMessage(type, title, message, trace) {
    const item = new FlashMessageItem(type, message, trace, title);
    FlashMessageService.showMessage(item);
  }

  static clear() {
    _messages = [];
  }

  static getMessages() {
    return _messages;
  }

  static deleteMessage(id) {
    _messages.splice(id, 1);
  }
}
