import React from "react";

function CustomTab({ text, selected, css, onClick }) {
  return (
    <div
      style={{
        ...css,
        width: 150,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <p
        style={{
          ...css,
          fontSize: 14,
          fontWeight: 600,
          backgroundColor: selected ? "#0B69FF" : "rgba(215, 223, 233, 0.24)",
          border: "1px solid #d7def9",
          textAlign: "center",
          padding: 6,
          color: selected ? "#ffffff" : "#171F46",
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default CustomTab;
