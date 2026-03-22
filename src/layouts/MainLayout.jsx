import React from "react";
import "../styles/layout.css";

export default function MainLayout({ sidebar, center, right, bottom }) {
  return (
    <div className="layout">

      <div className="sidebar">{sidebar}</div>

      <div className="center">{center}</div>


      <div className="right">{right}</div>

      <div className="bottom">{bottom}</div>

    </div>
  );
}