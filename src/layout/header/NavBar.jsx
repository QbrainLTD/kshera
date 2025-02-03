import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useCurrentUser } from "../../users/providers/UserProvider";

export default function IconLabelTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useCurrentUser();

 
  const tabs = [
    { label: "קרוב אליי", icon: <PersonPinIcon sx={{ color: "#607d8b", fontSize: "2rem" }} />, route: ROUTES.ROOT },
    { label: "אודות", icon: <InfoIcon sx={{ color: "#f50057", fontSize: "2rem" }} />, route: ROUTES.ABOUT_PAGE },
   
    ...(user ? [
      { label: "אהבתי", icon: <FavoriteIcon sx={{ color: "red", fontSize: "2rem" }} />, route: ROUTES.FAV_REST },
      { label: "הזמנות אחרונות", icon: <PhoneIcon sx={{ color: "#00e676", fontSize: "2rem" }} />, route: ROUTES.LAST_ORDERS },
      { label: "המסעדות שלי", icon: <StorefrontIcon sx={{ color: "#00e67", fontSize: "2rem" }} />, route: ROUTES.My_Restaurants }
    ] : [])
  ];

  const currentTab = Math.max(tabs.findIndex(tab => tab.route === location.pathname), 0);

  useEffect(() => {
    if (currentTab === -1) {
      navigate(ROUTES.ROOT);
    }
  }, [currentTab, navigate]);

  const handleChange = (event, newValue) => {
    navigate(tabs[newValue].route);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" padding="2vh">
      <Tabs value={currentTab} onChange={handleChange} aria-label="icon label tabs">
        {tabs.map((tab, index) => (
          <Tab key={index} icon={tab.icon} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
}
