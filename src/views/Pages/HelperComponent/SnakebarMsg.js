import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnakebarMsg = ({ open, duration = 4000, msg, msgType }) => {
  const [globalState, dispatch] = useStateValue();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: actionTypes.SET_CLOSE_MSG, payload: {} });
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={msgType}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnakebarMsg;
