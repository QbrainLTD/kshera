const mapRestaurantToModel = (restaurant) => {
  return {
    name: restaurant.name,
    country: restaurant.country || "",
    city: restaurant.city || "",
    street: restaurant.street || "",
    rating: restaurant.rating || 0,
    status: restaurant.status || "סגור",
    kosher: restaurant.kosher || false,
    tags: restaurant.tags || [],
    description: restaurant.description || "",
    imageUrl: restaurant.imageUrl || "",
    openingHours: {
      from: restaurant.openingHours?.from || "00:00",
      to: restaurant.openingHours?.to || "00:00",
    },
    isLiked: restaurant.isLiked || false,
  };
};

export default mapRestaurantToModel;
