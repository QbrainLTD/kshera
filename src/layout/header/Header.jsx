import React from 'react'
import AppBarResponsive from "./AppBarResponsive"
import { Typography } from '@mui/material'
import NavBar from "./NavBar"
import CheckBoxRest from "./CheckBoxRest"

export default function Header() {
  return (
    <>
      <Typography>TopBarSnack</Typography>
      <AppBarResponsive></AppBarResponsive>
      <NavBar></NavBar>
      <CheckBoxRest></CheckBoxRest>
    </>
  )
}
