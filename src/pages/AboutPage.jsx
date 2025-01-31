import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function AboutPage() {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, 
                alignItems: "center",
                justifyContent: "center",
                gap: 4, 
                padding: 3,
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <img
                    src="https://qbrain.co.il/wp-content/uploads/2025/01/logo.png"
                    alt="Kshera Logo"
                    style={{ width: "100%", maxWidth: 400, height: "auto" }}
                />
            </Box>
            <Box
                sx={{
                    flex: 1, 
                    textAlign: "justify",
                    direction: "rtl",
                    padding: 2,
                    maxWidth: "600px",
                }}
            >
                <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
                    אודות אתר המסעדות הכשרות
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.2rem", lineHeight: 1.8 }}>
                    האתר "כשרה" הוקמה במטרה לספק חוויה ייחודית ואיכותית לכל חובבי הקולינריה והמסעדות. כאן תוכלו לגלות מסעדות חדשות ומיוחדות, לשתף חוויות ולהכיר את המקומות הטובים ביותר בכל אזור. בין אם אתם מחפשים מסעדות בשריות, חלביות, אסייתיות, בתי קפה או אפילו מינימרקטים – האתר שלנו מספק את כל המידע במקום אחד.
                    <br /><br />
                    האתר פונה גם לבעלי מסעדות המעוניינים לפרסם את העסק שלהם ולהגיע לקהל יעד רחב יותר. בעזרת הכלים המתקדמים שלנו, ניתן להוסיף את פרטי המסעדה, לבחור תגיות ייחודיות, ולהציג תמונות שימשכו את תשומת לב הלקוחות.
                    <br /><br />
                    אז למה אתם מחכים? התחילו לגלות, להוסיף ולשתף את המסעדות האהובות עליכם!
                </Typography>
            </Box>

            {/* Image Section */}

        </Container>
    );
}
