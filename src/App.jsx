import restaurants from "./RestaurantCard"; // Import restaurant data
import AppBarResponsive from "./layout/header/AppBarResponsive";
import { Box } from "@mui/material";
import KosherRestaurantCard from "./KosherRestaurantCard";
import Header from "./layout/header/Header";



function App() {
  return (
    <>
      <Header></Header>
      {/* Container for the Restaurants */}
      <Box
        sx={{
          display: "flex", // Flexbox container
          flexDirection: "column", // Stack Restaurants vertically
          gap: 2, // Adds space between Restaurants (3 = 24px)
          alignItems: "center", // Center Restaurants horizontally
          padding: 2, // Padding around the container
        }}
      >
        {restaurants.map((restaurant, index) => (
          <KosherRestaurantCard key={index} restaurant={restaurant} />
        ))}
      </Box>
    </>
  );
}

export default App;
