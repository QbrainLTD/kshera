import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ROUTES from "../../../routes/routesModel";
import useUsers from "../../../users/hooks/useUsers";
import MenuLink from "../../../routes/components/MenuLink";
import { useCurrentUser } from "../../../users/providers/UserProvider";

const Menu = ({ isOpen, anchorEl, onClose }) => {
  const { user } = useCurrentUser();
  const { handleLogout } = useUsers();

  const onLogout = () => {
    handleLogout();
    onClose();
  };

  return (
    <MuiMenu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box>
        {/* Ensure navigateTo prop is always defined */}
        <MenuLink
          text="about"
          navigateTo={ROUTES.ABOUT || "/about"} // ✅ Fallback to "/about"
          onClick={onClose}
          styles={{ display: { xs: "block", md: "none" } }}
        />

        {!user && (
          <>
            <MenuLink
              text="login"
              navigateTo={ROUTES.LOGIN || "/login"} // ✅ Fallback to "/login"
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />
            <MenuLink
              text="signup"
              navigateTo={ROUTES.SIGNUP || "/signup"} // ✅ Fallback to "/signup"
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />
          </>
        )}

        {user && (
          <>
            <MenuLink
              text="profile"
              navigateTo={ROUTES.USER_PROFILE || "/profile"} // ✅ Fallback to "/profile"
              onClick={onClose}
            />
            <MenuLink
              text="edit account"
              navigateTo={ROUTES.EDIT_USER || "/edit-account"} // ✅ Fallback to "/edit-account"
              onClick={onClose}
            />
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </>
        )}
      </Box>
    </MuiMenu>
  );
};

export default Menu;
