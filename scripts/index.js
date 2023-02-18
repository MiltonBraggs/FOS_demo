import Home from "./components/Home.js";
import NotFound from "./components/NotFound.js";

function navigateTo(route) {
  history.pushState(null, "", route);
  router();
}

async function router() {
  const routes = [
    { path: "/", view: Home },
  ];

  const pathToRegex = (path) =>
    new RegExp(
      "^" + path.replace(/\//g, "\\/").replace(/-\{(.+?)\}/g, "-(.+)") + "$",
    );

  const potentialMatches = routes.map(
    (route) => ({
      route,
      result: location.pathname.match(pathToRegex(route.path)),
    }),
  );

  const match =
    potentialMatches.find((potentialMatch) => potentialMatch.result !== null) ??
      {
        route: { path: "/404", view: NotFound },
        result: [location.pathname],
      };

  const page = new match.route.view();

  document.querySelector("#app").innerHTML = await page.getHtml();
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

    router();
});
