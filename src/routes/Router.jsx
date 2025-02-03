import React from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES from "./routesModel";
import RestaurantsPage from "../restaurants/pages/RestaurantsPage";
import FavoriteRestaurants from "../restaurants/pages/FavoriteRestaurants";
import LastOrders from "../restaurants/pages/LastOrders";
import Layout from "../layout/Layout";
import LoginPage from "../users/pages/LoginPage";
import SignupPage from "../users/pages/SignupPage";
import MyRestaurantPage from "../restaurants/pages/MyRestaurantPage";
import CreateRestaurant from "../restaurants/pages/CreateRestaurant";
import AboutPage from "../pages/AboutPage";
import Profile from "../users/pages/Profile";
import ContactUs from "../pages/ContactUs";

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Layout />}>
        <Route index element={<RestaurantsPage />} />
        <Route path={ROUTES.FAV_REST} element={<FavoriteRestaurants />} />
        <Route path={ROUTES.LAST_ORDERS} element={<LastOrders />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignupPage />} />
        <Route path={ROUTES.My_Restaurants} element={<MyRestaurantPage />} />
        <Route path={ROUTES.CREATE_RESTAURANT} element={<CreateRestaurant />} />
        <Route path={ROUTES.ABOUT_PAGE} element={<AboutPage />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.CONTACTUS} element={<ContactUs />} />

      </Route>
    </Routes>
  );
}
