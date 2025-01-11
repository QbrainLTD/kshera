import React from 'react'
import AppBarResponsive from "./AppBarResponsive"
import NavBar from "./NavBar"
import CheckBoxRest from "./CheckBoxRest"
import LocationSearch from "./LocationSearch"
import { Margin } from '@mui/icons-material'
export default function Header() {
  return (
    <>
  
      <AppBarResponsive></AppBarResponsive>
      <div style={{ marginTop:"1vh",backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems:"center" }}>
        <LocationSearch></LocationSearch>
        <CheckBoxRest></CheckBoxRest>
      </div>
    </>
  )
}
