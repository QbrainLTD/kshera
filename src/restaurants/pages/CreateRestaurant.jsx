import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { useRestaurants } from "./RestaurantCard";
import { red, blue, green, orange, pink, purple } from "@mui/material/colors";

const restaurantTags = [
  { label: "בשרי", color: red[800] },
  { label: "חלבי", color: blue[800] },
  { label: "אסייתי", color: green[800] },
  { label: "מינימרקט", color: orange[800] },
  { label: "קינוחים", color: pink[800] },
  { label: "בית קפה", color: purple[800] },
];

export default function CreateRestaurant() {
  const { addRestaurant } = useRestaurants();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    tags: [],
    imageUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTagChange = (tag) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.includes(tag)
        ? prevData.tags.filter((t) => t !== tag)
        : [...prevData.tags, tag],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRestaurant = {
      ...formData,
      rating: 0,
      status: "פתוח",
      distance: "0.0 ק''מ",
      kosher: true,
    };
    addRestaurant(newRestaurant); // Add to the global restaurant list
    setFormData({ name: "", address: "", tags: [], imageUrl: "" }); // Reset form
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
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        הוסף מסעדה חדשה
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="שם המסעדה"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="כתובת המסעדה"
          name="address"
          value={formData.address}
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
                  sx={{
                    color: color,
                    "&.Mui-checked": {
                      color: color,
                    },
                  }}
                />
              }
              label={<span style={{ fontSize: "1.2rem" }}>{label}</span>}
            />
          ))}
        </FormGroup>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          שמור מסעדה
        </Button>
      </form>
    </Box>
  );
}
