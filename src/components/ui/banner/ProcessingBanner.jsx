// src/components/ProcessingBanner.js
import React from "react";

const ProcessingBanner = () => {
  return (
    <div
      style={{
        backgroundColor: "#4caf50",
        color: "white",
        padding: "10px",
        textAlign: "center",
        position: "fixed",
        top: "0",
        width: "100%",
        zIndex: "1000",
      }}
    >
      Data anda sedang diproses...
    </div>
  );
};

export default ProcessingBanner;
