import React from "react";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main>
      {/* Outlet is where the routed pages will be rendered */}
      <Outlet />
    </main>
  );
}
