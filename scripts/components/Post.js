import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.lastSlug = params.lastSlug
    this.setTitle(this.lastSlug);
  }

  setTitle(title) {
    document.title = title
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  async getHtml() {
    try {
      const response = await fetch(`/pages/posts/${this.lastSlug}.html`);
      return await response.text();
    } catch (_error) {
      const response = await fetch(`/pages/404.html`);
      return await response.text();
    }
  }
}
