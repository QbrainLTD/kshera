import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import useRestaurant from "../hooks/useRestaurant";
import useCountries from "../hooks/useCountries"; 
import { useCurrentUser } from "../../users/providers/UserProvider";


const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const hours = String(Math.floor(i / 2)).padStart(2, "0");
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hours}:${minutes}`;
});

const restaurantTags = [
  { label: "בשרי", color: "#b71c1c" },
  { label: "חלבי", color: "#0d47a1" },
  { label: "אסייתי", color: "#1b5e20" },
  { label: "מינימרקט", color: "#e65100" },
  { label: "קינוחים", color: "#880e4f" },
  { label: "בית קפה", color: "#4a148c" },
];

export default function CreateRestaurant() {
  const { addRestaurant } = useRestaurant();
  const { user } = useCurrentUser();
  const countries = useCountries(); 

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    street: "",
    description: "",
    tags: [],
    imageUrl: "",
    openingHours: { from: "09:00", to: "22:00" }, 
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "from" || name === "to") {
      setFormData((prevData) => ({
        ...prevData,
        openingHours: { ...prevData.openingHours, [name]: value }
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };


  const handleTagChange = (tag) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.includes(tag)
        ? prevData.tags.filter((t) => t !== tag)
        : [...prevData.tags, tag],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      alert("You must be logged in to add a restaurant.");
      return;
    }

    const newRestaurant = {
      ...formData,
      rating: 0,
      status: "פתוח",
      kosher: true,
      user_id: user._id,
    };

    try {
      await addRestaurant(newRestaurant);
      setFormData({
        name: "",
        country: "",
        city: "",
        street: "",
        description: "",
        tags: [],
        imageUrl: "",
        openingHours: { from: "08:00", to: "22:00" },
      });
    } catch (error) {
      alert("Failed to add restaurant. " + error.message);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        borderRadius: 2,
        backgroundColor: "#fff",
        direction:"rtl"
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        הוסף מסעדה חדשה
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField sx={{ direction: "rtl" }}
          direction="rtl"
          label="שם המסעדה"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          required
        />

        
        <FormControl fullWidth required>
          <InputLabel>בחר מדינה</InputLabel>
          <Select name="country" value={formData.country} onChange={handleInputChange}>
            <MenuItem value="">הצג הכל</MenuItem>
            {countries.map((country, index) => (
              <MenuItem key={index} value={country.name}>
                {country.name} ({country.englishName})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="עיר"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="רחוב ומספר"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="תיאור המסעדה"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="תמונת מסעדה (כתובת URL)"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleInputChange}
          fullWidth
          
        />

        
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>שעת פתיחה</InputLabel>
            <Select name="from" value={formData.openingHours.from} onChange={handleInputChange}>
              {Array.from({ length: 24 }, (_, i) => (
                <MenuItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                  {`${i.toString().padStart(2, "0")}:00`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>שעת סגירה</InputLabel>
            <Select name="to" value={formData.openingHours.to} onChange={handleInputChange}>
              {Array.from({ length: 24 }, (_, i) => (
                <MenuItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                  {`${i.toString().padStart(2, "0")}:00`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography variant="h6" gutterBottom>
          בחר תגיות:
        </Typography>
        <FormGroup>
          {restaurantTags.map(({ label, color }) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  checked={formData.tags.includes(label)}
                  onChange={() => handleTagChange(label)}
                  sx={{ color: color, "&.Mui-checked": { color: color } }}
                />
              }
              label={<span style={{ fontSize: "1.2rem" }}>{label}</span>}
            />
          ))}
        </FormGroup>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          שמור מסעדה
        </Button>
      </form>
    </Box>
  );
}
