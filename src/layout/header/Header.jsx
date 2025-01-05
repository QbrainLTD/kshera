import React from 'react'
import AppBarResponsive from "./AppBarResponsive"
import NavBar from "./NavBar"
import CheckBoxRest from "./CheckBoxRest"

export default function Header() {
  return (
    <>
  
      <AppBarResponsive></AppBarResponsive>
      <div style={{backgroundColor:"white"}}>
      <NavBar></NavBar>
        <CheckBoxRest></CheckBoxRest>
      </div>
    </>
  )
}
