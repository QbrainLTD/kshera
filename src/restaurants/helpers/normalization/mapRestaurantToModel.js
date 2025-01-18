const mapRestaurantToModel = (restaurant) => {
  return {
    name: restaurant.name,
    address: restaurant.address,
    rating: restaurant.rating || 0, // Default to 0 if not provided
    status: restaurant.status || "סגור", // Default to "סגור" if not provided
    distance: restaurant.distance || "0 ק''מ", // Default to "0 ק''מ"
    kosher: restaurant.kosher || false, // Default to false if not provided
    tags: restaurant.tags || [], // Default to an empty array if not provided
    description: restaurant.description || "", // Default to an empty string if not provided
    imageUrl: restaurant.imageUrl || "", // Default to an empty string
  };
};

export default mapRestaurantToModel;
