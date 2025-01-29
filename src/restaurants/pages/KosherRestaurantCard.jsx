import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import useRestaurant from "../hooks/useRestaurant"; // Ensure you import useRestaurant

const StyledCard = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#F7F9FC",
    boxShadow: "0 2px 4px rgba(12, 12, 12, 0.2)",
    direction: "rtl",
    gap: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column", // Stack content on small screens
        textAlign: "center",
        alignItems: "center",
    },
}));

const StyledImage = styled(Box)(({ theme }) => ({
    width: "200px",
    height: "200px",
    borderRadius: "8px",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
        width: "100%", // Full width on small screens
        height: "auto",
    },
}));

const ActionButton = styled(Button)(({ theme }) => ({
    flex: 1,
    borderRadius: theme.spacing(1),
    textTransform: "none",
    fontWeight: "bold",
    margin: theme.spacing(0.5),
}));

function KosherRestaurantCard({ restaurant }) {
    const { toggleLike } = useRestaurant(); // Get toggleLike from the custom hook

    const handleLikeClick = () => {
        toggleLike(restaurant._id); // Pass restaurant ID to toggleLike
    };

    return (
        <StyledCard>
            <StyledImage component="img" src={restaurant.imageUrl} alt={restaurant.name} />

            <Box flex={2} sx={{ width: "100%", padding: 2 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1} sx={{ flexWrap: "wrap" }}>
                    <Typography variant="h5" fontWeight="bold">
                        {restaurant.name}
                    </Typography>
                    <Chip
                        label={restaurant.rating}
                        color="primary"
                        avatar={<Avatar>{restaurant.name.charAt(0)}</Avatar>}
                        sx={{ fontWeight: "bold", fontSize: "1rem" }}
                    />
                </Box>

                <Typography variant="body2" color="text.secondary">
                    {restaurant.address}
                </Typography>

                <Typography variant="body2" color={restaurant.status === "סגור" ? "error" : "success"} mb={2}>
                    {restaurant.status}
                </Typography>

                <Box display="flex" alignItems="center" justifyContent="center" flexWrap="wrap" mb={2} gap={1}>
                    <Chip icon={<LocationOnIcon />} label={restaurant.distance} />
                    <Chip label={restaurant.kosher ? "כשר" : "לא כשר"} color={restaurant.kosher ? "success" : "warning"} />
                    {restaurant.tags.map((tag, index) => (
                        <Chip key={index} label={tag} />
                    ))}
                    <FavoriteIcon
                        sx={{
                            color: restaurant.isLiked ? "red" : "gray",
                            fontSize: "2rem",
                            cursor: "pointer",
                        }}
                        onClick={handleLikeClick} // Call handleLikeClick on icon click
                    />
                </Box>

                <Typography variant="body2" color="text.secondary" mb={2}>
                    {restaurant.description}
                </Typography>

                <Box display="flex" justifyContent="center" gap={1}>
                    <ActionButton variant="contained" color="primary">
                        ניווט
                    </ActionButton>
                    <ActionButton variant="contained" color="info">
                        הזמנת שולחן
                    </ActionButton>
                </Box>
            </Box>
        </StyledCard>
    );
}

KosherRestaurantCard.propTypes = {
    restaurant: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        distance: PropTypes.string.isRequired,
        kosher: PropTypes.bool.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        isLiked: PropTypes.bool.isRequired,
    }).isRequired,
};

export default KosherRestaurantCard;
