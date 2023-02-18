import Home from "./components/Home.js";
import Post from "./components/Post.js";
import NotFound from "./components/NotFound.js";

function navigateTo(route) {
  history.pushState(null, "", route);
  router();
}

async function router() {
  const routes = [
    { path: "/", view: Home },
    { path: "/posts/{slug}", view: Post },
  ];

  const pathToRegex = (path) =>
    path.startsWith("/posts/")
      ? new RegExp(`^\\/posts\\/(.+)$`)
      : new RegExp(
          `^${path.replace(/\//g, "\\/").replace(/-\{(.+?)\}/g, "-(.+)")}$`
        );

  const potentialMatches = routes.map((route) => ({
    route,
    result: location.pathname.match(pathToRegex(route.path)),
  }));

  console.log(potentialMatches);

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
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
