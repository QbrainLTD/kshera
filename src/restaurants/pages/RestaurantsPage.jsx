import React, { useEffect, useState } from "react";
import KosherRestaurantCard from "./KosherRestaurantCard";
import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import useRestaurant from "../hooks/useRestaurant";
import CheckBoxRest from "../../layout/header/CheckBoxRest";
import useCountries from "../hooks/useCountries"; // Import country hook

export default function RestaurantsPage() {
  const {
    filteredRestaurants,
    isLoading,
    error,
    fetchRestaurants,
    handleFilterTags,
  } = useRestaurant();

  const countries = useCountries(); // Get country list
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetchRestaurants(); // Fetch all restaurants on component mount
  }, [fetchRestaurants]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  // Filter restaurants by country from the address field
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
      <CheckBoxRest onFilterChange={handleFilterTags} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        {/* Country Filter Dropdown */}
        <FormControl sx={{ mb: 2, minWidth: 200 }}>
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

        {/* Filtered Restaurants */}
        {filteredByCountry.map((restaurant, index) => (
          <KosherRestaurantCard key={index} restaurant={restaurant} />
        ))}
      </Box>
    </>
  );
}
