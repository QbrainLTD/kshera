import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import { pink, green, blue, orange, purple, red } from '@mui/material/colors';

// List of restaurant types and their corresponding colors
const restaurantTypes = [
    { label: 'בשרי', color: red[800] },
    { label: 'חלבי', color: blue[800] },
    { label: 'אסייתי', color: green[800] },
    { label: 'מינימרקט', color: orange[800] },
    { label: 'קינוחים', color: pink[800] },
    { label: 'בתי קפה', color: purple[800] },
];

export default function ColorCheckboxes() {
    const [checkedState, setCheckedState] = React.useState(
        restaurantTypes.reduce((acc, { label }) => {
            acc[label] = false;
            return acc;
        }, {})
    );

    const handleChange = (label) => {
        setCheckedState((prevState) => ({
            ...prevState,
            [label]: !prevState[label],
        }));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }} justifyContent="center">
            <FormGroup row>
                {restaurantTypes.map(({ label, color }) => (
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
                        label={<span style={{ fontSize: '1.5rem' }}>{label}</span>}
                    />
                ))}
            </FormGroup>
        </Box>
    );
}
