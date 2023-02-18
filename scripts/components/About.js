import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("About");
  }

  async getHtml() {
    const response = await fetch("/pages/about.html");
    return await response.text();
  }
}
