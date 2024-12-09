import React from "react";
import { Box } from "@mui/material";
import ROUTES from "../../../routes/routesModel";
import LogoIcon from "../logo/LogoIcon";
import Logo from "../logo/Logo";
import NavBarItem from "../../../routes/components/NavBarItem";
import { useCurrentUser } from "../../../users/providers/UserProvider";
export default function LeftNavBar() {
  const { user } = useCurrentUser();
  return (
    <Box>
      <LogoIcon />
      <Logo />
      <NavBarItem to={ROUTES.ABOUT} label={"About"} />
      {user && user.isBusiness && (
        <>
          <NavBarItem to={ROUTES.Restaurants} label={"Restaurants"} />
          <NavBarItem to={ROUTES.FAV_Restaurants} label={"My Favorite"} />
          <NavBarItem to={ROUTES.MY_Restaurants} label={"My Restaurants"} />
        </>
      )}
      {user && user.isAdmin && <NavBarItem to={ROUTES.SANDBOX} label={"Sandbox"} />}
    </Box>
  );
}
