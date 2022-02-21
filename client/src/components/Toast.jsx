import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const Toast = ({ msg, handleShow }) => {
  console.log(msg.title);
  return (
    <div>
      <Stack
        sx={{ width: "50%", objectFit: "contain" }}
        spacing={2}
        style={{ position: "absolute", right: "1%", top: "1%", zIndex: 35 }}
      >
        <Alert onClose={handleShow} severity={msg.title}>
          <AlertTitle>{msg.title}</AlertTitle>
          {msg.body} — <strong>check it out!</strong>
        </Alert>
      </Stack>
    </div>
  );
};

export default Toast;
