import React, { useState } from 'react';

export default function useRestaurant() {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked); // Toggle the like state
    };

    return {
        handleLike,
        liked, // Expose the liked state
    };
}
