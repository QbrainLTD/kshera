import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Box } from '@mui/material';
import ROUTES from '../../routes/routesModel';
import { useNavigate } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import { useCurrentUser } from '../../users/providers/UserProvider';

export default function IconLabelTabs() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Navigate to the new route when the tab changes
    if (newValue === 3) navigate(ROUTES.LAST_ORDERS);
    if (newValue === 2) navigate(ROUTES.FAV_REST);
    if (newValue === 0) navigate(ROUTES.ROOT);
    if (newValue === 1) navigate(ROUTES.ABOUT_PAGE);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="2vh"
    >
      
      <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
        <Tab
          icon={<PersonPinIcon sx={{ color: '#607d8b', fontSize: "2rem" }} />}
          label="קרוב אליי"
        />
        <Tab
          icon={<InfoIcon sx={{ color: '#f50057', fontSize: "2rem" }} />}
          label="אודות"
        />
       

        {user ? <Tab
          icon={<FavoriteIcon sx={{ color: 'red', fontSize: "2rem" }} />}
          label="אהבתי"
        /> : null}

        {user ? <Tab
          icon={<PhoneIcon sx={{ color: '#00e676', fontSize: "2rem" }} />}
          label="הזמנות אחרונות"
        /> : null}

      </Tabs>
    </Box>
  );
}
