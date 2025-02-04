import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, useMediaQuery, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import InfoIcon from "@mui/icons-material/Info";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useCurrentUser } from "../../users/providers/UserProvider";

export default function ResponsiveNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useCurrentUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const tabs = [
    { label: "קרוב אליי", icon: <PersonPinIcon sx={{ color: "#607d8b" }} />, route: ROUTES.ROOT },
    { label: "אודות", icon: <InfoIcon sx={{ color: "#f50057" }} />, route: ROUTES.ABOUT_PAGE },
    ...(user
      ? [
        { label: "אהבתי", icon: <FavoriteIcon sx={{ color: "red" }} />, route: ROUTES.FAV_REST },
        { label: "הזמנות אחרונות", icon: <PhoneIcon sx={{ color: "#00e676" }} />, route: ROUTES.LAST_ORDERS },
        { label: "המסעדות שלי", icon: <StorefrontIcon sx={{ color: "#ff9800" }} />, route: ROUTES.My_Restaurants },
      ]
      : []),
  ];

  const currentTab = Math.max(tabs.findIndex((tab) => tab.route === location.pathname), 0);

  useEffect(() => {
    if (currentTab === -1) {
      navigate(ROUTES.ROOT);
    }
  }, [currentTab, navigate]);

  const handleChange = (event, newValue) => {
    navigate(tabs[newValue].route);
  };

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0, backgroundColor: "white", zIndex: 1000 }}>
      {isMobile ? (
        <BottomNavigation value={currentTab} onChange={handleChange} showLabels>
          {tabs.map((tab, index) => (
            <BottomNavigationAction
              key={index}
              label={tab.label}
              icon={React.cloneElement(tab.icon, { fontSize: "medium" })} // Ensures color & size
            />
          ))}
        </BottomNavigation>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" padding="2vh">
          <Tabs value={currentTab} onChange={handleChange} aria-label="icon label tabs">
            {tabs.map((tab, index) => (
              <Tab key={index} icon={React.cloneElement(tab.icon, { fontSize: "large" })} label={tab.label} />
            ))}
          </Tabs>
        </Box>
      )}
    </Box>
  );
}
