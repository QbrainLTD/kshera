import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    Grid,
    Container,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SendIcon from "@mui/icons-material/Send";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("📩 Sending message:", formData);
        alert("Your message has been sent successfully!");
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Grid container spacing={3} alignItems="center">
                {/* Contact Form */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom fontWeight="bold">
                                צור קשר
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                נשמח לשמוע ממך! מלא את הפרטים ואנו ניצור קשר בהקדם.
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="שם מלא"
                                    name="fullName"
                                    variant="outlined"
                                    margin="normal"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="מספר טלפון"
                                    name="phone"
                                    variant="outlined"
                                    margin="normal"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    margin="normal"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="כתוב לנו"
                                    name="message"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    margin="normal"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    endIcon={<SendIcon />}
                                >
                                    שלח /י
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Contact Information */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, boxShadow: 3, textAlign: "center" }}>
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold">
                                צור קשר עם QBrain
                            </Typography>

                            <Box display="flex" alignItems="center" mt={2} gap={1}>
                                <EmailIcon color="primary" />
                                <Typography variant="body1">info@qbrain.co.il</Typography>
                            </Box>

                            <Box display="flex" alignItems="center" mt={2} gap={1}>
                                <PhoneIcon color="primary" />
                                <Typography variant="body1">+972-50-1234567</Typography>
                            </Box>

                            <Box display="flex" alignItems="center" mt={2} gap={1}>
                                <ScheduleIcon color="primary" />
                                <Typography variant="body1">
                                    שעות פתיחה: ראשון-חמישי: 09:00-18:00
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="textSecondary">
                                שישי: 09:00-11:00 (פגישות זום בלבד) | שבת: סגור
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
