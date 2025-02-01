import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { useCurrentUser } from "../../users/providers/UserProvider";
import useRestaurant from "../hooks/useRestaurant";
import moment from "moment";
import { useSnack } from "../../providers/SnackbarProvider";

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
        flexDirection: "column",
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
        width: "100%",
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
    const { handleLike, reserveRestaurant } = useRestaurant();
    const { user } = useCurrentUser();
    const [liked, setLiked] = useState(restaurant.isLiked);
    const setSnack = useSnack();
    const handleReservationClick = () => {
        reserveRestaurant(restaurant._id);
    };

    useEffect(() => {
        setLiked(restaurant.isLiked); // ✅ Ensure sync with backend updates
    }, [restaurant.isLiked]);

    const handleLikeToggle = async () => {
        if (!user?._id) {
            setSnack("error", "עליך להתחבר כדי לאהוב מסעדה.");
            return;
        }

        try {
            await handleLike(restaurant._id); // ✅ Call the API to update like status
            setLiked((prevLiked) => !prevLiked); // ✅ Toggle local state for instant UI update
        } catch (error) {
            console.error("❌ Error toggling like:", error);
            setSnack("error", "שגיאה בעת שינוי סטטוס אהבתי.");
        }
    };

    const handleNavigateClick = () => {
        if (!restaurant.street || !restaurant.city || !restaurant.country) {
            alert("כתובת המסעדה אינה זמינה");
            return;
        }

        const address = `${restaurant.street}, ${restaurant.city}, ${restaurant.country}`;
        const encodedAddress = encodeURIComponent(address);

        const wazeUrl = `https://waze.com/ul?q=${encodedAddress}&navigate=yes`;
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            window.open(wazeUrl, "_blank");
        } else {
            window.open(googleMapsUrl, "_blank");
        }
    };

    // ✅ Display Opening Hours Correctly
    const openingHoursText = restaurant.openingHours
        ? `${restaurant.openingHours.from} - ${restaurant.openingHours.to}`
        : "שעות פתיחה אינן זמינות";

    return (
        <StyledCard>
            <StyledImage component="img" src={restaurant.imageUrl} alt={restaurant.name} />

            <Box flex={2} sx={{ width: "100%", padding: 2 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1} sx={{ flexWrap: "wrap" }}>
                    <Typography variant="h5" fontWeight="bold">
                        {restaurant.name}
                    </Typography>
                    <Chip label={restaurant.rating} color="primary" avatar={<Avatar>{restaurant.name.charAt(0)}</Avatar>} />
                </Box>

                <Typography variant="body2" color="text.secondary">
                    {`${restaurant.street}, ${restaurant.city}, ${restaurant.country}`}
                </Typography>

                {/* ✅ Show Opening Hours */}
                <Typography variant="body2" color="text.secondary" mb={1}>
                    <strong>שעות פתיחה:</strong> {openingHoursText}
                </Typography>

                {/* ✅ Show Open/Closed Status */}
                <Typography variant="body2" color={restaurant.status === "סגור" ? "error" : "success"} mb={2}>
                    {restaurant.status}
                </Typography>

                <Box display="flex" alignItems="center" justifyContent="center" flexWrap="wrap" mb={2} gap={1}>
                    <Chip label={restaurant.kosher ? "כשר" : "לא כשר"} color={restaurant.kosher ? "success" : "warning"} />
                    {restaurant.tags.map((tag, index) => (
                        <Chip key={index} label={tag} />
                    ))}
                    {user && ( // ✅ Show like button only for logged-in users
                        <IconButton onClick={handleLikeToggle}>
                            <FavoriteIcon sx={{ color: liked ? "red" : "gray" }} />
                        </IconButton>
                    )}
                </Box>

                <Typography variant="body2" color="text.secondary" mb={2}>
                    {restaurant.description}
                </Typography>

                <Box display="flex" justifyContent="center" gap={1}>
                    <ActionButton variant="contained" color="primary" onClick={handleNavigateClick}>
                        ניווט
                    </ActionButton>
                    <ActionButton variant="contained" color="info" onClick={handleReservationClick}>
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
        country: PropTypes.string,
        city: PropTypes.string,
        street: PropTypes.string,
        rating: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        kosher: PropTypes.bool.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        isLiked: PropTypes.bool.isRequired,
        openingHours: PropTypes.shape({
            from: PropTypes.string,
            to: PropTypes.string,
        }),
    }).isRequired,
};

export default KosherRestaurantCard;
