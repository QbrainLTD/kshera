import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import useRestaurant from "../hooks/useRestaurant";

const StyledCard = styled(Card)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(5),
    width: "50%",
    backgroundColor: "#F7F9FC",
    boxShadow: "0 2px 4px rgba(12, 12, 12, 2.1)",
    direction: "rtl",
}));

const ActionButton = styled(Button)(({ theme }) => ({
    flex: 1,
    borderRadius: theme.spacing(1),
    textTransform: "none",
    fontWeight: "bold",
    margin: theme.spacing(0.5),
}));

function KosherRestaurantCard({ restaurant }) {
    const { handleLike, liked } = useRestaurant();
    return (
        <StyledCard >
            <Box
                component="img"
                src={restaurant.imageUrl}
                alt={restaurant.name}
                sx={{
                    width: 300,
                    height: 300,
                    borderRadius: "8px",
                    objectFit: "cover",
                    marginRight: 3,// Increased gap between image and text
                    marginLeft: 10,
                }}
            />

            <Box flex={2}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">
                            {restaurant.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {restaurant.address}
                        </Typography>
                    </Box>
                    <Chip
                        label={restaurant.rating}
                        color="primary"
                        avatar={<Avatar>{restaurant.name.charAt(0)}</Avatar>}
                        sx={{ fontWeight: "bold", fontSize: "1rem" }}
                    />
                </Box>

                <Typography variant="body2" color={restaurant.status === "סגור" ? "error" : "success"} mb={2}>
                    {restaurant.status}
                </Typography>

                <Box display="flex" alignItems="center" mb={2}>
                    <Chip
                        icon={<LocationOnIcon />}
                        label={restaurant.distance}
                        sx={{ marginRight: 1 }}
                    />
                    <Chip
                        label={restaurant.kosher ? "כשר" : "לא כשר"}
                        color={restaurant.kosher ? "success" : "warning"}
                        sx={{ marginRight: 1 }}
                    />
                    {restaurant.tags.map((tag, index) => (
                        <Chip key={index} label={tag} sx={{ marginRight: 1 }} />
                    ))}
                    <FavoriteIcon
                        sx={{
                            color: liked ? 'red' : 'gray', // Toggle color based on liked state
                            fontSize: "2rem",
                            marginRight: 25,
                            cursor: "pointer",
                        }}
                        onClick={handleLike}
                    />
                </Box>

                <Typography variant="body2" color="text.secondary" mb={2}>
                    {restaurant.description}
                </Typography>

                <Box display="flex" gap={1}>
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

// Define PropTypes for the KosherRestaurantCard component
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
    }).isRequired,
};

export default KosherRestaurantCard;
