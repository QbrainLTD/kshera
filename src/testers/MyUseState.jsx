import { Button, Typography } from '@mui/material';
import React, { useState } from 'react'

export default function MyUseState() {
    const [toggle, setToggle] = useState(true);
    const [counter, setCounter] = useState(0);
    const handleClickPlus = () => {
        setCounter((prev)=>prev+1);
        
    };
    const handleClickMinus = () => {
        setCounter((prev)=>prev-1);
        
    };
    return (
        <>
            <Button variant='contained' onClick={() => { setToggle(!toggle) }}>ClickMe</Button>
            <Typography>{toggle ? "hello" : "bye"}</Typography>
            <Button variant='contained' onClick={handleClickPlus}>+</Button>
            <Button variant='contained' onClick={handleClickMinus}>-</Button>
            <Typography>{counter}</Typography>
        </>
    )
}
