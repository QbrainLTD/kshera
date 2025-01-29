const normalizeRestaurant = (restaurant) => {
  return {
    name: restaurant.name,
    country: restaurant.country || "",
    city: restaurant.city || "",
    street: restaurant.street || "",
    rating: restaurant.rating || 0,
    status: restaurant.status || "סגור",
    kosher: restaurant.kosher ?? false, // Ensure kosher is explicitly handled
    tags: Array.isArray(restaurant.tags) ? restaurant.tags : [], // Ensure it's an array
    description: restaurant.description || "",
    imageUrl:
      restaurant.imageUrl ||
      "https://qbrain.co.il/wp-content/uploads/2025/01/logo.png", // Default image if not provided
    openingHours: {
      from: restaurant.openingHours?.from || "00:00", // Default to midnight if not provided
      to: restaurant.openingHours?.to || "00:00",
    },
    user_id: restaurant.user_id,
  };
};

export default normalizeRestaurant;

