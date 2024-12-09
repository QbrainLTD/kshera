import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Box } from '@mui/material';

export default function IconLabelTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="2vh"
    >
      <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
        <Tab icon={<PhoneIcon sx={{ color: '#00e676', fontSize: "2rem" }} />} label="הזמנות אחרונות" />
        <Tab
          icon={<FavoriteIcon sx={{ color: 'red', fontSize:"2rem" }} />}
          label="אהבתי"
        />
        <Tab icon={<PersonPinIcon sx={{
          color: '#607d8b', fontSize: "2rem" }} />} label="קרוב אליי" />
      </Tabs>
    </Box>
  );
}
