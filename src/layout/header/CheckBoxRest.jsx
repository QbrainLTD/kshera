import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import { red, blue, green, orange, pink, purple } from '@mui/material/colors';
import { Button } from '@mui/material';
import ROUTES from '../../routes/routesModel';
import { useNavigate } from 'react-router-dom';

// Custom tags and corresponding colors
const restaurantTags = [
    { label: 'בשרי', color: red[800] },
    { label: 'חלבי', color: blue[800] },
    { label: 'אסייתי', color: green[800] },
    { label: 'מינימרקט', color: orange[800] },
    { label: 'קינוחים', color: pink[800] },
    { label: 'בית קפה', color: purple[800] },
];

export default function CheckBoxRest({ onFilterChange }) {
    const [checkedState, setCheckedState] = useState(
        restaurantTags.reduce((acc, { label }) => {
            acc[label] = false; // Initialize all checkboxes as unchecked
            return acc;
        }, {})
    );
    const navigate = useNavigate(); 
    const handleBtnClick = () => {
        navigate(ROUTES.CREATE_RESTAURANT);
    };
    const handleChange = (label) => {
        const updatedState = {
            ...checkedState,
            [label]: !checkedState[label], // Toggle the state for the clicked checkbox
        };
        setCheckedState(updatedState);

        // Pass selected tags to the parent component
        const selectedTags = Object.keys(updatedState).filter((key) => updatedState[key]);
        onFilterChange(selectedTags); // Call the parent function with the selected tags
    };

    return (
        <Box
            sx={{
                position: 'fixed', // Fix the position
                top: '20%', // Adjust the top position as needed
                right: '5%', // Adjust the left position as needed
                zIndex: 1000, // Ensure it stays above other elements
                backgroundColor: '#fff', // Optional: add a background color
                border: '1px solid #ddd', // Optional: border for better visibility
                borderRadius: '8px', // Rounded corners
                padding: 2, // Add padding
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Optional: shadow for elevation
            }}
        >
            <FormGroup>
                {restaurantTags.map(({ label, color }) => (
                    <FormControlLabel
                        key={label}
                        control={
                            <Checkbox
                                checked={checkedState[label]}
                                onChange={() => handleChange(label)}
                                sx={{
                                    color: color,
                                    '&.Mui-checked': {
                                        color: color,
                                    },
                                }}
                            />
                        }
                        label={<span style={{ fontSize: '1.2rem' }}>{label}</span>}
                    />
                ))}
            </FormGroup>
            <Button variant="contained" color='success' onClick={handleBtnClick} >הוסף מסעדה</Button>
        </Box>
        
    );
}
