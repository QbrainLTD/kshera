import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
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
        phone: "",
        imageUrl: "", // ✅ Add Image URL field
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (!user?._id) {
                    setError("User not authenticated.");
                    return;
                }

                const response = await axios.get(`http://localhost:8181/users/${user._id}`);
                setUserData(response.data);

                setFormData({
                    firstName: response.data?.name?.first || "",
                    middleName: response.data?.name?.middle || "",
                    lastName: response.data?.name?.last || "",
                    email: response.data?.email || "",
                    street: response.data?.address?.street || "",
                    city: response.data?.address?.city || "",
                    country: response.data?.address?.country || "",
                    phone: response.data?.phone || "",
                    imageUrl: response.data?.image?.url || "", // ✅ Set initial image URL
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
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        try {
            if (!user?._id) {
                setSnack({ open: true, message: "משתמש לא מזוהה, נסה להתחבר מחדש.", severity: "error" });
                return;
            }

            const updateData = {
                name: {
                    first: formData.firstName,
                    middle: formData.middleName,
                    last: formData.lastName,
                },
                address: {
                    country: formData.country,
                    city: formData.city,
                    street: formData.street,
                },
                phone: formData.phone,
                email: formData.email,
                image: {
                    url: formData.imageUrl, // ✅ Update Image URL
                    alt: `${formData.firstName} ${formData.lastName}`,
                },
            };

            console.log("🔵 Sending update data:", updateData);

            const response = await axios.put(
                `http://localhost:8181/users/${user._id}`,
                updateData
            );

            console.log("✅ User updated successfully:", response.data);

            setUser(response.data);
            setExpanded(false);
            setSnack({ open: true, message: "הפרופיל עודכן בהצלחה!", severity: "success" });
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
                        src={formData.imageUrl || "/default-avatar.png"}
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
                                    <TextField fullWidth label="כתובת תמונת פרופיל" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} />
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
