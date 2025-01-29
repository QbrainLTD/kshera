import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from '@mui/icons-material/Logout';
import useUsers from "../../../users/hooks/useUsers";
import { Box } from "@mui/material";
import { useMenu } from "../menu/MenuProvider";

export default function Logged() {
  const { handleLogout } = useUsers();
  const { setOpen, isOpen } = useMenu(); // Destructure setOpen correctly

  const handleAvatarClick = () => {
    setOpen(!isOpen); // Toggle menu state
  };

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
      <Tooltip title="Open settings">
        <IconButton
          sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
          onClick={handleAvatarClick} // Now it works!
        >
          <Avatar alt="avatar" src="/images/avatar.png" />
        </IconButton>
      </Tooltip>
      <IconButton onClick={handleLogout}>
        <LogoutIcon />
      </IconButton>
    </Box>
  );
}
