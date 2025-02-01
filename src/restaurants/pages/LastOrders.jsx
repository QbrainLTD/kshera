import React, { useEffect, useState } from "react";
import {
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import useRestaurant from "../hooks/useRestaurant";
import { useCurrentUser } from "../../users/providers/UserProvider";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function LastOrders() {
  const { fetchUserReservations, handleCancelReservation, reservations } = useRestaurant();
  const { user } = useCurrentUser();
  const [lastOrders, setLastOrders] = useState([]);

  useEffect(() => {
    if (user?._id) {
      fetchUserReservations(user._id).then((data) => {
        setLastOrders(Array.isArray(data) ? data : []);
      });
    }
  }, [user, fetchUserReservations, reservations]);

  const handleNavigate = (restaurant) => {
    const address = encodeURIComponent(`${restaurant.street}, ${restaurant.city}, ${restaurant.country}`);
    const wazeUrl = `https://waze.com/ul?q=${address}&navigate=yes`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    window.open(isMobile ? wazeUrl : googleMapsUrl, "_blank");
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }} variant="h3">
        הזמנות אחרונות
      </Typography>

      {lastOrders.length > 0 ? (
        <TableContainer component={Paper} sx={{ borderRadius: "10px", overflow: "hidden", boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>תמונה</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>שם המסעדה</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>כתובת</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>שעות פתיחה</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>סטטוס</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>אישור</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lastOrders.map((restaurant) => (
                <TableRow key={restaurant._id || restaurant.id} sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}>
                  {/* ✅ Image */}
                  <TableCell align="center">
                    <CardMedia
                      component="img"
                      height="80"
                      image={restaurant.imageUrl}
                      alt={restaurant.name}
                      sx={{ borderRadius: "8px", width: "90px", objectFit: "cover" }}
                    />
                  </TableCell>

                  {/* ✅ Restaurant Name */}
                  <TableCell>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#007BFF" }}>
                      {restaurant.name}
                    </Typography>
                  </TableCell>

                  {/* ✅ Address */}
                  <TableCell>
                    <Typography variant="body2">{`${restaurant.street}, ${restaurant.city}, ${restaurant.country}`}</Typography>
                  </TableCell>

                  {/* ✅ Opening Hours */}
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ color: "#4caf50", fontWeight: "bold" }}>
                      {restaurant.openingHours
                        ? `${restaurant.openingHours.from} - ${restaurant.openingHours.to}`
                        : "שעות פתיחה אינן זמינות"}
                    </Typography>
                  </TableCell>

                  {/* ✅ Status (Open/Closed) */}
                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        color: restaurant.status === "סגור" ? "red" : "green",
                      }}
                    >
                      {restaurant.status}
                    </Typography>
                  </TableCell>

                  {/* ✅ Approval Status */}
                  <TableCell align="center">
                    {restaurant.isApproved ? (
                      <CheckCircleIcon sx={{ color: "green", fontSize: "1.8rem" }} />
                    ) : (
                      <Typography variant="body2" sx={{ color: "#f57c00", fontWeight: "bold" }}>
                        ⏳ ממתינה לאישור
                      </Typography>
                    )}
                  </TableCell>

                  {/* ✅ Actions (Navigate + Cancel) */}
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mx: 1, textTransform: "none" }}
                      startIcon={<LocationOnIcon />}
                      onClick={() => handleNavigate(restaurant)}
                    >
                      ניווט
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      sx={{ textTransform: "none" }}
                      startIcon={<CancelIcon />}
                      onClick={() => handleCancelReservation(restaurant._id || restaurant.id)}
                    >
                      בטל הזמנה
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h5" sx={{ textAlign: "center", width: "100%", mt: 3, color: "#757575" }}>
          אין הזמנות שמורות.
        </Typography>
      )}
    </Box>
  );
}
