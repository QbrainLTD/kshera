import React from "react";
import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "20px 40px",
        marginTop: "40px",
        borderTop: "1px solid #ddd",
        textAlign: "center",
      }}
    >
      <Grid container spacing={4}>
        {/* Logo and About Section */}
        <Grid item xs={12} md={4}>
          <Box>
            <img
              src="https://via.placeholder.com/150" // Replace with your logo URL
              alt="QBrain Logo"
              style={{ height: "50px", marginBottom: "10px" }}
            />
            <Typography variant="body2" color="textSecondary">
              חברת קיובריין בע"מ | תכנון | הנדסה | אינטגרציה | רשתות תקשורת |
              פתרונות בנייה מלאכותית | ייעוץ טכנולוגי
            </Typography>
            <Box mt={2}>
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                sx={{ color: "#3b5998" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                sx={{ color: "#e4405f" }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                sx={{ color: "#0077b5" }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        {/* Navigation Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            מפה אתר
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="none" color="inherit">
              הקמת תשתיות תקשורת
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="none" color="inherit">
              הקמת אולפני טלוויזיה
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="none" color="inherit">
              English & Apps
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="none" color="inherit">
              הלקוחות שלנו
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="#" underline="none" color="inherit">
              צור קשר
            </Link>
          </Typography>
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Get In Touch
          </Typography>
          <Typography variant="body2">מתחם Open Valley</Typography>
          <Typography variant="body2">info@qbrain.co.il</Typography>
          <Typography variant="body2">054-6010610</Typography>
          <Typography variant="body2">
            שעות פתיחה: ראשון עד חמישי 9:00 - 18:00
          </Typography>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Box mt={4} borderTop="1px solid #ddd" pt={2}>
        <Typography variant="body2" color="textSecondary">
          © 2025 All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}
