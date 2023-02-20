import Home from "./components/Home.js";
import Post from "./components/Post.js";
import About from "./components/About.js";
import NotFound from "./components/NotFound.js";

function navigateTo(route) {
  history.pushState(null, "", route);
  router();
}

async function router() {
  const routes = [
    { path: "/", view: Home },
    { path: "/about", view: About },
    { path: "/posts/{slug}", view: Post },
  ];

  const pathToRegex = (path) =>
    new RegExp(`^${path.replace(/\//g, "\\/").replace(/\{(.+?)\}/g, "(.+)")}$`);

  const potentialMatches = routes.map((route) => ({
    route,
    result: location.pathname.match(pathToRegex(route.path)),
  }));

  const match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  ) ?? {
    route: { path: "/404", view: NotFound },
    result: [location.pathname],
  };

  const params = {
    lastSlug: location.pathname.split("/").pop(),
  };

  const page = new match.route.view(params);

  document.querySelector("#app").innerHTML = await page.getHtml();
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("[data-link]");
    if (anchor) {
      e.preventDefault();
      navigateTo(anchor);
    }
  });

  navigateTo('/')
});
