import KosherRestaurantCard from "./KosherRestaurantCard";
import restaurants from "./RestaurantCard"; // Import restaurant data
import AppBarResponsive from "./AppBarResponsive";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <AppBarResponsive />

      {/* Container for the cards */}
      <Box
        sx={{
          display: "flex", // Flexbox container
          flexDirection: "column", // Stack cards vertically
          gap: 3, // Adds space between cards (3 = 24px)
          alignItems: "center", // Center cards horizontally
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
