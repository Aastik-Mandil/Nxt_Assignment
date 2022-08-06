import React from "react";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

function ResourceCard({ resource }) {
  const history = useHistory();

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #d7dfe9",
        borderRadius: 4,
        padding: 20,
        height: 192,
        width: "100%",
        cursor: "pointer",
      }}
      onClick={() => {
        history.push(`/resource/${resource?.id}`);
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={resource?.icon_url}
          alt={"image"}
          style={{
            width: 44,
            height: 44,
            objectFit: "contain",
            border: "2px solid #D7DFE9",
            borderRadius: 4,
            padding: 4,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 16,
          }}
        >
          <Typography
            style={{
              fontSize: 16,
              fontWeight: 500,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {resource?.title}
          </Typography>

          <Typography
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: "#7e858e",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {resource?.category}
          </Typography>
        </div>
      </div>

      <Typography
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: "#0b69ff",
          marginTop: 24,
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {resource?.link}
      </Typography>

      <Typography
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: "#7e858e",
          marginTop: 18,
          textOverflow: "ellipsis",
          overflow: "hidden",
          display: "-webkit-box !important",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          whiteSpace: "normal",
        }}
      >
        {resource?.description}
      </Typography>
    </div>
  );
}

export default ResourceCard;
