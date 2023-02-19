import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.lastSlug = params.lastSlug;
    this.setTitle(this.lastSlug);
  }

  setTitle(title) {
    document.title = title
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  async get404() {
    this.setTitle("Page not found");
    const response = await fetch("/pages/404.html");
    return await response.text();
  }

  async getHtml() {
    const response = await fetch(`/pages/posts/${this.lastSlug}.html`);
    if (response.status === 200) {
      return await response.text();
    } else {
      return await this.get404();
    }
  }
}
