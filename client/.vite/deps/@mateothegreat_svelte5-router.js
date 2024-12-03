import {
  __privateAdd,
  __privateGet,
  __privateSet,
  __publicField
} from "./chunk-RGIOIEUU.js";

// node_modules/@mateothegreat/svelte5-router/actions/route.js
function route(node) {
  const handleClick = (event) => {
    event.preventDefault();
    window.history.pushState({}, "", node.href);
    const navigationEvent = new CustomEvent("navigation", {
      detail: { href: node.href }
    });
    window.dispatchEvent(navigationEvent);
  };
  node.addEventListener("click", handleClick);
  return {
    destroy() {
      node.removeEventListener("click", handleClick);
    }
  };
}

// node_modules/@mateothegreat/svelte5-router/methods.js
var goto = (path, queryParams) => {
  const url = new URL(path, window.location.origin);
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  window.history.pushState({}, "", url.toString());
};
var query = (key) => {
  return new URLSearchParams(window.location.search).get(key);
};

// node_modules/@mateothegreat/svelte5-router/index.js
export * from "C:/Users/Milan/Documents/WebAdvanced/node_modules/@mateothegreat/svelte5-router/router.svelte";

// node_modules/@mateothegreat/svelte5-router/instance.svelte.js
var _pre, _post;
var Instance = class {
  /**
   * Creates a new router instance.
   * @param {string} basePath (optional) The base path to navigate to.
   * @param {Route[]} routes The routes to navigate to.
   * @param {PreHooks} pre (optional) The pre hooks to run before navigating to a route.
   * @param {PostHooks} post (optional) The post hooks to run after navigating to a route.
   * @param {string} currentPath (optional) The current path to automaticallynavigate to.
   */
  constructor(basePath, routes, pre, post, currentPath) {
    __publicField(this, "id", crypto.randomUUID());
    __publicField(this, "basePath");
    __publicField(this, "routes", []);
    __privateAdd(this, _pre);
    __privateAdd(this, _post);
    __publicField(this, "current", $state());
    __publicField(this, "navigating", $state(false));
    this.basePath = basePath;
    this.routes = routes;
    if (currentPath) {
      this.current = this.get(currentPath);
    }
    __privateSet(this, _pre, pre);
    __privateSet(this, _post, post);
  }
  /**
   * Get the route for a given path.
   * @returns { Route } The route for the given path.
   */
  get(path) {
    let route2;
    let pathToMatch = path;
    if (this.basePath && this.basePath !== "/") {
      pathToMatch = path.replace(this.basePath, "");
    }
    if (pathToMatch === "/") {
      route2 = this.routes.find((route3) => route3.path === "/");
    }
    const [first, ...rest] = pathToMatch.replace(/^\//, "").split("/");
    route2 = this.routes.find((route3) => route3.path === first);
    if (!route2) {
      for (const r of this.routes) {
        const regexp = new RegExp(r.path);
        const match = regexp.exec(path);
        if (match) {
          route2 = { ...r, params: match.groups || match.slice(1) };
          break;
        }
      }
    }
    return route2;
  }
  /**
   * Navigates to a given route, running  the pre and post hooks.
   * @param {Route} route The route to navigate to.
   * @returns {Promise<void>}
   */
  async run(route2) {
    this.navigating = true;
    if (__privateGet(this, _pre)) {
      if (Array.isArray(__privateGet(this, _pre))) {
        for (const pre of __privateGet(this, _pre)) {
          route2 = await pre(route2);
        }
      } else {
        route2 = await __privateGet(this, _pre).call(this, route2);
      }
    }
    if (route2 && route2.pre) {
      if (Array.isArray(route2.pre)) {
        for (const pre of route2.pre) {
          const r = await pre(route2);
          if (r) {
            route2 = r;
          }
        }
      } else {
        const r = await route2.pre(route2);
        if (r) {
          route2 = r;
        }
      }
    }
    this.current = route2;
    if (route2 && route2.post) {
      if (Array.isArray(route2.post)) {
        for (const post of route2.post) {
          await post(route2);
        }
      } else {
        await route2.post(route2);
      }
    }
    if (__privateGet(this, _post)) {
      if (Array.isArray(__privateGet(this, _post))) {
        for (const post of __privateGet(this, _post)) {
          await post(route2);
        }
      } else {
        await __privateGet(this, _post).call(this, route2);
      }
    }
    this.navigating = false;
  }
};
_pre = new WeakMap();
_post = new WeakMap();

// node_modules/@mateothegreat/svelte5-router/query.svelte.js
var QueryString = class {
  constructor() {
    __publicField(this, "params", $state());
    this.params = Object.fromEntries(new URLSearchParams(window.location.search));
  }
  get(key, defaultValue) {
    return this.params[key] || defaultValue;
  }
  set(key, value) {
    this.params[key] = value;
  }
  delete(key) {
    delete this.params[key];
  }
  clear() {
    this.params = {};
  }
  toString() {
    return Object.entries(this.params).map(([key, value]) => `${key}=${value}`).join("&");
  }
  goto(path) {
    goto(path, this.params);
  }
};

// node_modules/@mateothegreat/svelte5-router/index.js
import Router from "C:/Users/Milan/Documents/WebAdvanced/node_modules/@mateothegreat/svelte5-router/router.svelte";
export {
  QueryString,
  Router,
  Instance as default,
  goto,
  query,
  route
};
//# sourceMappingURL=@mateothegreat_svelte5-router.js.map
