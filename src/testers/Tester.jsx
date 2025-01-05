import { Button, TextField } from '@mui/material';
import React from 'react'

export default function Tester() {

    const handleClick = (name) => {
        console.log("you Click here" + name);

    }
    const handleEventClick = (e) => {
        console.log(e);

    }

    return (
        <>
            {/* <Button variant='contained' onClick={() => handleClick(" idan")}>Click me</Button>
            <Button variant='contained' onClick={handleEventClick}>Click me</Button>
            <TextField onMouseOver={() => {
                console.log("over");
            }} onChange={(e) => console.log(e.target.value)
            }></TextField> */}
            {/* <Button variant='contained' onClick={(e) => console.log(e.target.innerText)
            }>ClickMe</Button>
            <TextField></TextField> */}

        </>
    )
}
