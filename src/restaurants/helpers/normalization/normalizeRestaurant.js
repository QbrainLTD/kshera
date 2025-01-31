const normalizeRestaurant = (restaurant, userId) => {
  return {
    name: restaurant.name,
    country: restaurant.country || "",
    city: restaurant.city || "",
    street: restaurant.street || "",
    rating: restaurant.rating || 0,
    status: restaurant.status || "סגור",
    kosher: restaurant.kosher ?? false,
    tags: Array.isArray(restaurant.tags) ? restaurant.tags : [],
    description: restaurant.description || "",
    imageUrl:
      restaurant.imageUrl ||
      "https://qbrain.co.il/wp-content/uploads/2025/01/logo.png",
    openingHours: {
      from: restaurant.openingHours?.from || "00:00",
      to: restaurant.openingHours?.to || "00:00",
    },
    user_id: restaurant.user_id || userId, // ✅ Ensure user_id is assigned
  };
};

export default normalizeRestaurant;

