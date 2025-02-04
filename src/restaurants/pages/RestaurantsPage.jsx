import React, { useEffect, useState } from "react";
import KosherRestaurantCard from "./KosherRestaurantCard";
import { Box, Select, MenuItem, FormControl, InputLabel, Typography } from "@mui/material";
import useRestaurant from "../hooks/useRestaurant";
import CheckBoxRest from "../../layout/header/CheckBoxRest";
import useCountries from "../hooks/useCountries";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function RestaurantsPage() {
  const {
    filteredRestaurants,
    isLoading,
    error,
    fetchRestaurants,
    handleFilterTags,
  } = useRestaurant();

  const countries = useCountries();
  const [selectedCountry, setSelectedCountry] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:1200px)"); 
  const isMobile = useMediaQuery("(max-width:600px)"); 

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const filteredByCountry = selectedCountry
    ? filteredRestaurants.filter((restaurant) =>
      (restaurant.country || "").includes(selectedCountry)
    )
    : filteredRestaurants;


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
     
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "row" : "column",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          width: "100vw",
          maxWidth: "100%",
          margin: "0 auto",
          padding: 0,
          
          
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          color="#424242"
          sx={{
            mt: 2,
            mb: 2,
            fontSize: { xs: "1.0rem", sm: "2rem", md: "2.0rem" },
            direction:"rtl"
          }}
        >
         🌎 כשרה - מגלים עולם של טעמים כשרים 🍴
        </Typography>

        <CheckBoxRest onFilterChange={handleFilterTags} />

        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>בחר מדינה</InputLabel>
          <Select value={selectedCountry} onChange={handleCountryChange}>
            <MenuItem value="">הצג הכל</MenuItem>
            {countries.length > 0 ? (
              countries.map((country, index) => (
                <MenuItem key={index} value={country.name}>
                  {country.name} ({country.englishName})
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>לא נמצאו מדינות</MenuItem>
            )}
          </Select>
        </FormControl>

      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100vw",
          maxWidth: "80vw",
          margin: "0 auto",
          padding: 2,
          
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            flexGrow: 1,
          }}
        >
          {filteredByCountry.map((restaurant, index) => (
            <KosherRestaurantCard
              key={index}
              restaurant={{
                ...restaurant,
                address: `${restaurant.street}, ${restaurant.city}, ${restaurant.country}` 
              }}
            />

          ))}
        </Box>
      </Box>
    </>
  );
}
