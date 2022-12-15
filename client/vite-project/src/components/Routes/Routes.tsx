import { Routes, Route } from "react-router-dom";
import { pageRoutes } from "./constant.routes";
import Home from "../Pages/Home";
import Login from "../Login/Login";

const routes = [
  {
    path: pageRoutes.home,
    element: Home,
  },

  {
    path: pageRoutes.login,
    element: Login,
  },
];
function MERNRoutes() {
  return (
    <Routes>
      {routes.map((route) => {
        if (!route) return;

        return (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          ></Route>
        );
      })}
    </Routes>
  );
}
export default MERNRoutes;
