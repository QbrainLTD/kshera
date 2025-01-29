import React, { useEffect, useState } from "react";
import KosherRestaurantCard from "./KosherRestaurantCard";
import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
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
  const isSmallScreen = useMediaQuery("(max-width:1200px)"); // Below 1200px
  const isMobile = useMediaQuery("(max-width:600px)"); // Below 600px for extra mobile adjustments

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const filteredByCountry = selectedCountry
    ? filteredRestaurants.filter((restaurant) =>
      restaurant.address.includes(selectedCountry)
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
      {/* Filters Section - Moves to Top for Smaller Screens */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "row" : "column",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: 2,
        }}
      >
        {/* CheckBoxRest - Moves Above Cards for Screens < 1200px & Becomes Row */}
        <CheckBoxRest onFilterChange={handleFilterTags} />

        {/* Country Filter Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>בחר מדינה</InputLabel>
          <Select value={selectedCountry} onChange={handleCountryChange}>
            <MenuItem value="">הצג הכל</MenuItem>
            {countries.map((country, index) => (
              <MenuItem key={index} value={country.name}>
                {country.name} ({country.englishName})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Main Content - Cards & Sidebar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100%",
          maxWidth: "80%",
          margin: "0 auto",
          padding: 2,
        }}
      >
        {/* Restaurants Section */}
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
            <KosherRestaurantCard key={index} restaurant={restaurant} />
          ))}
        </Box>
      </Box>
    </>
  );
}
