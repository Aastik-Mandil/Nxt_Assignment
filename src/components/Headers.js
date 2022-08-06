import React from "react";
import { Avatar } from "@mui/material";
import { GoPerson } from "react-icons/go";

function Headers() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e5e5",
        padding: "10px 30px",
        position: "sticky",
        top: 0,
        zIndex: 99,
      }}
    >
      <img src="/NxtWave_logo.png" alt="NxtWave_logo" />

      <Avatar src={``}>
        <GoPerson />
      </Avatar>
    </div>
  );
}

export default Headers;
