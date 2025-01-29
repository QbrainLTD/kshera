import React from "react";
import { string, func } from "prop-types";
import NavBarLink from "./NavBarLink";
import MenuItem from "@mui/material/MenuItem";
import { makeFirstLetterCapital } from "../../layout/header/menu/utils/algoMethods";

const MenuLink = ({ text = "Default", navigateTo = "/", onClick, styles = {} }) => {
  return (
    <NavBarLink to={navigateTo}>
      <MenuItem sx={{ ...styles }} onClick={onClick}>
        {makeFirstLetterCapital(text)}
      </MenuItem>
    </NavBarLink>
  );
};

MenuLink.propTypes = {
  navigateTo: string.isRequired,
  onClick: func.isRequired,
  text: string.isRequired,
};

export default MenuLink;
