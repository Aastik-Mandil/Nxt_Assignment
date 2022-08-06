import React from "react";

import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import { useDispatch, useSelector } from "react-redux";
import { setResponseMessage } from "../redux/reducers/basicReducer";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Toast() {
  const basicReducerState = useSelector((state) => state.basicReducer);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setResponseMessage({ open: false, status: "", message: "" }));
  };

  return (
    <Snackbar
      open={basicReducerState?.responseMessage?.open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={basicReducerState?.responseMessage?.status}
      >
        {basicReducerState?.responseMessage?.message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
