import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Page Not Found");
    }

    async getHtml() {
        const response = await fetch("/pages/404.html");
        return await response.text();
    }
}

