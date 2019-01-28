// ##############################
// // // RegularCard styles
// #############################

import { card, defaultFont } from "assets/jss/material-dashboard-pro-react.jsx";

const regularCardStyle = {
  card,
  cardPlain: {
    background: "transparent",
    boxShadow: "none"
  },
  cardHeader: {
    padding: "15px 20px 0",
    zIndex: "3"
  },
  cardTitle: {
    ...defaultFont,
    display: "inline-block",
    width: "50%",
    color: "#00ADF3",
    textDecoration: "none",
    marginTop: "0",
    marginBottom: "3px",
    fontSize: "25px",
    "& small": {
      fontWeight: "400",
      lineHeight: "1",
      color: "#777"
    }
  },
  right: {
    textAlign: "right"
  },
  left: {
    textAlign: "left"
  },
  center: {
    textAlign: "center"
  },
  cardSubtitle: {
    ...defaultFont,
    display: "inline-block",
    width: "50%",
    color: "#999999",
    fontSize: "14px",
    margin: "0 0 10px"
  },
  cardContent: {
    padding: "15px 20px !important",
    position: "relative"
  }
};

export default regularCardStyle;
