import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import { red, blue, green, orange, pink, purple } from '@mui/material/colors';
import { Button } from '@mui/material';
import ROUTES from '../../routes/routesModel';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../users/providers/UserProvider';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
            acc[label] = false;
            return acc;
        }, {})
    );

    const { user } = useCurrentUser();
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery("(max-width:1800px)"); // Below 1200px

    const handleBtnClick = () => {
        navigate(ROUTES.CREATE_RESTAURANT);
    };

    const handleChange = (label) => {
        const updatedState = {
            ...checkedState,
            [label]: !checkedState[label],
        };
        setCheckedState(updatedState);

        const selectedTags = Object.keys(updatedState).filter((key) => updatedState[key]);
        onFilterChange(selectedTags);
    };

    return (
        <Box
            sx={{
                position: isSmallScreen ? "relative" : "absolute",
                top: isSmallScreen ? "auto" : "25%",
                right: isSmallScreen ? "auto" : "18%",
                zIndex: 1000,
                backgroundColor: '#fff',
                border: isSmallScreen ? "none" : "1px solid #ddd",
                borderRadius: "8px",
                padding: 2,
                boxShadow: isSmallScreen ? "none" : "0px 4px 6px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: isSmallScreen ? "row" : "column",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: isSmallScreen ? "wrap" : "nowrap",
                gap: 1,
                width: isSmallScreen ? "100%" : "auto",
                overflowX: isSmallScreen ? "auto" : "visible",
            }}
        >
            <FormGroup row={isSmallScreen} sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {restaurantTags.map(({ label, color }) => (
                    <FormControlLabel
                        key={label}
                        control={
                            <Checkbox
                                checked={checkedState[label]}
                                onChange={() => handleChange(label)}
                                sx={{
                                    color: color,
                                    '&.Mui-checked': { color: color },
                                }}
                            />
                        }
                        label={<span style={{ fontSize: '1rem' }}>{label}</span>}
                    />
                ))}
            </FormGroup>

            {user && (
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleBtnClick}
                    sx={{
                        whiteSpace: "nowrap",
                        minWidth: isSmallScreen ? "120px" : "auto",
                    }}
                >
                    הוסף מסעדה
                </Button>
            )}
        </Box>
    );
}
