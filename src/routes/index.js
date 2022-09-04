import FilmLayout from "../layout/FilmLayout";
import LoginLayout from "../layout/LoginLayout";
import ProfileLayout from "../layout/ProfileLayout";
import Category from "../pages/Category";
import FilmDetail from "../pages/FilmDetail";
import FilmWatch from "../pages/FilmWatch";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Search from "../pages/Search";

const routes = [
  {
    path: "/", // xong
    element: Home,
  },
  {
    path: "/tv", // xong
    element: Home,
  },
  {
    path: "/login", // xong
    element: Login,
    layout: LoginLayout,
  },
  {
    path: "/movie/:id", // xong
    element: FilmDetail,
    layout: FilmLayout,
  },
  {
    path: "/tv/:id", //xong
    element: FilmDetail,
    layout: FilmLayout,
  },
  {
    path: "/movie/:id/watch", //xong
    element: FilmWatch,
    layout: FilmLayout,
  },
  {
    path: "/tv/:id/watch", //xong
    element: FilmWatch,
    layout: FilmLayout,
  },
  {
    path: "/search", //xong
    element: Search,
  },
  {
    path: "/category", //xong
    element: Category,
  },
  {
    path: "/profile", //xong
    element: Profile,
    layout: ProfileLayout,
  },
];

export default routes;
