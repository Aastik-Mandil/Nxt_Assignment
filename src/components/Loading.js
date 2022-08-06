import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Wave } from "react-css-spinners";

const useStyle = makeStyles((theme) => ({
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: "9999",
  },
}));

function Loading({ load }) {
  const classes = useStyle();

  return load ? (
    <div className={classes.loadingContainer}>
      <Wave color="rgba(176,169,172,1)" size={59} thickness={9} />
    </div>
  ) : null;
}

export default Loading;
