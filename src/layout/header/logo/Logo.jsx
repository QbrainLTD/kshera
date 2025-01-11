import React from "react";
import { Typography } from "@mui/material";
import NavBarLink from "../../../routes/components/NavBarLink";
import ROUTES from "../../../routes/routesModel";
import LogoIcon from "./LogoIcon";

export default function Logo() {
  return (
    <>
      <NavBarLink to={ROUTES.ROOT}>
        <LogoIcon
          variant="h4"
          sx={{
            marginRight: 6,
            fontFamily: "fantasy",
            display: { xs: "none", md: "inline-flex" },
          }}
        >
          
        </LogoIcon>
      </NavBarLink>
    </>
  );
}
