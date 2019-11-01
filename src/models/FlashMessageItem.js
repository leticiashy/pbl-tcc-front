export default class FlashMessageItem {
  constructor(type, message, title, trace) {
    this.type = type;
    this.message = message;
    this.trace = trace;
    this.title = title;
  }
}
