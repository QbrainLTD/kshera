import React from "react";
import { Typography } from "@mui/material";
import NavBarLink from "../../../routes/components/NavBarLink";
import ROUTES from "../../../routes/routesModel";
import LogoIcon from "./LogoIcon";

export default function Logo() {
  return (
    <>
      <NavBarLink to={ROUTES.ROOT}>
        <img src="/images/ksheraLogo.png" alt="KsheraIcon" style={{ width: "100%", height: "3vh" }} />
      </NavBarLink>
    </>
  );
}
