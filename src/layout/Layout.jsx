import React from "react";
import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import { Typography } from "@mui/material";

export default function Layout() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Fixed Header */}
        <header
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1000,
          }}
        >
          <Header />
        </header>

        {/* Scrollable Main Content */}
        <main
          style={{
            flexGrow: 23,
            marginTop: "15vh", 
            overflowY: "auto",
          }}
        >
          <Main>
          </Main>
          
        </main>

        <Footer />

      </div>

    </>
  );
}