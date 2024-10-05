import { lazy } from 'react';

declare interface RouteConfig {
  path: string;
  element: any;
  nested?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    path: "/",
    element: lazy(() => import("./../templates/HomeTemplate/HomeTemplate")),
    nested: [
      { path: "", element: lazy(() => import("./../pages/Home/Home"))},
      { path: "/news", element: lazy(() => import("./../pages/News/News"))},
      { path: "/contact", element: lazy(() => import("./../pages/Contact/Contact"))},
      { path: "/detail/:id", element: lazy(() => import("./../pages/Detail/Detail"))},
      { path: "/history", element: lazy(() => import("./../pages/History/History"))},
    ]
  },

  {
    path: "/admin",
    element: lazy(() => import("./../templates/AdminTemplate/AdminTemplate")),
    nested: [
        { path: "dashboard", element: lazy(() => import("./../pages/Dashboard/Dashboard")) },
        { path: "manageUser", element: lazy(() => import("./../pages/ManageUser/ManageUser")) },
        { path: "manageFilm", element: lazy(() => import("./../pages/ManageFilm/ManageFilm")) },
        { path: "manageShowTime", element: lazy(() => import("./../pages/ManageShowTime/ManageShowTime")) },
    ]
  },

  {
    path: "/login",
    element: lazy(() => import("./../templates/UserTemplate/UserTemplate")),
    nested: [
        { path: "", element: lazy(() => import("./../pages/Login/Login")) },
    ]
  },

  {
    path: "/register",
    element: lazy(() => import("./../templates/UserTemplate/UserTemplate")),
    nested: [
        { path: "", element: lazy(() => import("./../pages/Register/Register")) },
    ]
  },
  {
    path: "/checkout/:id",
    element: lazy(() => import("./../templates/CheckoutTemplate/CheckoutTemplate")),
  },

];

export { routes };
