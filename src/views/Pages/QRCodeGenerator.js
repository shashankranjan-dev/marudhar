import React from "react";
import { Box } from "@material-ui/core";
import QRCode from "qrcode.react";

const QRCodeGenerate = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box width="100%" height="100%">
        QR Generater
        <QRCode
          value={JSON.stringify({ name: "Shadab", Address: "Dhanbad" })}
        />
        ,
      </Box>
    </div>
  );
};

export default QRCodeGenerate;
