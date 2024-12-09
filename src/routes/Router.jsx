import React from "react";
import { Route, Routes } from "react-router-dom";
import RestaurantsPage from "../Restaurants/pages/RestaurantsPage";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import ROUTES from "./routesModel";
import FavoriteRestaurants from "../Restaurants/pages/FavoriteRestaurants";
import LoginPage from "../users/pages/LoginPage";
import MyRestaurantsPage from "../Restaurants/pages/MyRestaurantsPage";
import SandboxPage from "../sandbox/SandboxPage";
import SignupPage from "../users/pages/SignupPage";
import RestaurantDetailsPage from "../Restaurants/pages/RestaurantDetailsPage";
import EditRestaurantPage from "../Restaurants/pages/EditRestaurantPage";
import CreateRestaurant from "../Restaurants/pages/CreateRestaurant";
import RestaurantForm from "../Restaurants/components/RestaurantForm";

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<RestaurantsPage />} />
      <Route path={ROUTES.Restaurants} element={<RestaurantsPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.FAV_Restaurants} element={<FavoriteRestaurants />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.MY_Restaurants} element={<MyRestaurantsPage />} />
      <Route path={ROUTES.Restaurant_FORM} element={<RestaurantForm />} />
      <Route path={ROUTES.CREATE_Restaurant} element={<CreateRestaurant />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.Restaurant_INFO + "/:id"} element={<RestaurantDetailsPage />} />
      <Route path={ROUTES.EDIT_Restaurant + "/:id"} element={<EditRestaurantPage />} />
      <Route path={ROUTES.SANDBOX} element={<SandboxPage />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
