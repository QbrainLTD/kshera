import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    CircularProgress,
    Grid,
    Button,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Snackbar,
    Alert
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCurrentUser } from "../../users/providers/UserProvider";
import axios from "axios";

export default function Profile() {
    const { user, setUser } = useCurrentUser();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        country: "",
        password: "",
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (!user?._id) {
                    setError("User not authenticated.");
                    return;
                }

                const response = await axios.get(`http://localhost:5000/users/${user._id}`);
                setUserData(response.data);

                setFormData({
                    firstName: response.data?.name?.first || "",
                    middleName: response.data?.name?.middle || "",
                    lastName: response.data?.name?.last || "",
                    email: response.data?.email || "",
                    street: response.data?.address?.street || "",
                    city: response.data?.address?.city || "",
                    country: response.data?.address?.country || "",
                    password: "",
                });
            } catch (err) {
                console.error("❌ Error fetching user profile:", err);
                setError("Failed to load user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [user]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = async () => {
        try {
            const updateData = { ...formData };

            // 🟢 Prevent empty values from overwriting existing data
            Object.keys(updateData).forEach(key => {
                if (!updateData[key] || updateData[key] === "") {
                    delete updateData[key];
                }
            });

            // 🟢 Ensure `address` is correctly structured
            if (updateData.address) {
                updateData.address = {
                    ...user.address, // Preserve existing address fields
                    ...updateData.address, // Only update changed fields
                };
            }

            const response = await axios.put(`http://localhost:5000/users/${user._id}`, updateData);

            console.log("✅ User updated successfully:", response.data);

            // 🟢 Update frontend state
            setUser(response.data);
            setExpanded(false); // Close accordion

            setSnack({ open: true, message: "פרופיל עודכן בהצלחה!", severity: "success" });
        } catch (err) {
            console.error("❌ Error updating profile:", err);
            setSnack({ open: true, message: "שגיאה בעדכון הפרופיל. נסה שוב.", severity: "error" });
        }
    };


    return (
        <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 3 }}>
                <CardContent sx={{ textAlign: "center" }}>
                    <Avatar
                        src={typeof userData?.image === "string" ? userData.image : "/default-avatar.png"}
                        alt="User Avatar"
                        sx={{ width: 100, height: 100, margin: "auto", marginBottom: 2 }}
                    />

                    <Typography variant="h5" fontWeight="bold">
                        {`${userData?.name?.first || ""} ${userData?.name?.middle || ""} ${userData?.name?.last || ""}`.trim()}
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        📧 {userData?.email || "לא צויין"}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
                        📍 {userData?.address?.street || "רחוב לא צויין"}, {userData?.address?.city || "עיר לא צויינה"},
                        {userData?.address?.country || "מדינה לא צויינה"}
                    </Typography>

                    <Typography variant="body1" color={userData?.isAdmin ? "success.main" : "primary.main"} sx={{ marginTop: 2 }}>
                        {userData?.isAdmin ? "🛠️ מנהל מערכת" : "👤 משתמש רגיל"}
                    </Typography>

                    <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
                        <Button variant="contained" color="primary" onClick={() => setExpanded(!expanded)}>
                            ערוך פרופיל
                        </Button>
                    </Grid>

                    <Accordion expanded={expanded} sx={{ marginTop: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">עדכן פרטי משתמש</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="שם פרטי" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="שם אמצעי" name="middleName" value={formData.middleName} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="שם משפחה" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="אימייל" name="email" value={formData.email} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="רחוב" name="street" value={formData.street} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="עיר" name="city" value={formData.city} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="מדינה" name="country" value={formData.country} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="סיסמה חדשה" type="password" name="password" value={formData.password} onChange={handleInputChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant="contained" color="success" onClick={handleSaveChanges}>
                                        שמור שינויים
                                    </Button>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>

            <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
                <Alert severity={snack.severity} sx={{ width: "100%" }}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
