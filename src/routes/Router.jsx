import React from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES from "./routesModel";
import RestaurantsPage from "../restaurants/pages/RestaurantsPage";
import FavoriteRestaurants from "../restaurants/pages/FavoriteRestaurants";
import LastOrders from "../restaurants/pages/LastOrders";
import Layout from "../layout/Layout";
import LoginPage from "../users/pages/LoginPage";
import SignupPage from "../users/pages/SignupPage";

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Layout />}>
        <Route index element={<RestaurantsPage />} />
        <Route path={ROUTES.FAV_REST} element={<FavoriteRestaurants />} />
        <Route path={ROUTES.LAST_ORDERS} element={<LastOrders />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignupPage />} />

      </Route>
    </Routes>
  );
}
