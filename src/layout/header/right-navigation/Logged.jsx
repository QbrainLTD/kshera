import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from '@mui/icons-material/Logout';
import useUsers from "../../../users/hooks/useUsers";
import { useCurrentUser } from "../../../users/providers/UserProvider"; 
import { Box } from "@mui/material";
import { useMenu } from "../menu/MenuProvider";

export default function Logged() {
  const { handleLogout } = useUsers();
  const { user } = useCurrentUser(); 
  const { setOpen, isOpen } = useMenu(); 

  const handleAvatarClick = () => {
    setOpen(!isOpen);
  };

  
  const profileImage = user?.image?.url || "/images/avatar.png";

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
      <Tooltip title="Open settings">
        <IconButton
          sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
          onClick={handleAvatarClick}
        >
          <Avatar alt={user?.name?.first || "User"} src={profileImage} />
        </IconButton>
      </Tooltip>
      <IconButton onClick={handleLogout}>
        <LogoutIcon />
      </IconButton>
    </Box>
  );
}
