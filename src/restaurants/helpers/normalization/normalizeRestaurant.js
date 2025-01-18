const normalizeRestaurant = (restaurant) => {
  return {
    name: restaurant.name,
    address: restaurant.address,
    rating: restaurant.rating || 0, // Default rating to 0 if not provided
    status: restaurant.status || "סגור", // Default status to "סגור" if not provided
    distance: restaurant.distance || "0 ק''מ", // Default distance if not provided
    kosher: restaurant.kosher || false, // Default to false if not specified
    tags: restaurant.tags || [], // Default to an empty array if no tags provided
    description: restaurant.description || "", // Default to an empty string if no description
    imageUrl: restaurant.imageUrl || "", // Default to an empty string if no image URL
  };
};

export default normalizeRestaurant;
