import React from "react";
import { Box, IconButton, Toolbar } from "@mui/material";
import { useTheme } from "../../../providers/CustomThemeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useCurrentUser } from "../../../users/providers/UserProvider";
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import SearchBar from "./SearchBar";
import MoreButton from "./MoreButton";

export default function RightNavbar() {
  const { user } = useCurrentUser();
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <>
    <Box sx={{ display: { xs: "none", md: "inline-flex" }, alignItems: "center" }}>
      <Toolbar>
        
        <SearchBar />

        <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode}>
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {user ? <Logged /> : <NotLogged />}
      </Toolbar>
      </Box>
      <MoreButton />
    </>
  );
}
