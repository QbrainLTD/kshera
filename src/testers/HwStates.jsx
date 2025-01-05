import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

export default function HwStates() {
    const [myText, setMyText] = useState("");
    const [myTextList, setMyTextList] = useState([]);
    const [addText, SetAddText] = useState("");
    const [btnText, setBtnText] = useState("");
    const [textToggle, SetTextToggle] = useState(true);

    return (
        <div>
            <TextField value={myText} onChange={(e) => setMyText(e.target.value)}></TextField>
            <Button onClick={() => setBtnText(myText)}>show my text</Button>
            <Typography>{btnText}</Typography>
            {textToggle ? <Typography>hello</Typography> : null}
            <Button onClick={() => SetTextToggle((prev) => !prev)}>Clickme </Button>
            <TextField sx={{mt:5}} value={addText} onChange={(e)=>SetAddText(e.target.value)}></TextField>
            <Button sx={{ mt: 5 }}>Add</Button>
        </div>
    )
}
