import React from "react";
import NavBarItem from "../../../routes/components/NavBarItem";
import { Box } from "@mui/material";
import ROUTES from "../../../routes/routesModel";

export default function NotLogged() {
  return (
    <Box>
      <NavBarItem label="Signup" to={ROUTES.SIGNUP} />
      <NavBarItem label="Login" to={ROUTES.LOGIN} />
    </Box>
  );
}
