// ##############################
// // // StatsCard styles
// #############################

import {
  card,
  cardHeader,
  defaultFont,
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  cardActions,
  grayColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  primaryColor,
  roseColor
} from "assets/jss/material-dashboard-pro-react.jsx";

const StatsCardBackground = "#00ADF3";

const statsCardStyle = {
   cardOpen: {
  ...card,
    backgroundColor: "#4481EB",
    borderRadius: "4px",
    minHeight: "300px",
    cursor: "pointer",
  },
  cardClosed:{
  ...card,
    backgroundColor: "#5D5D5D",
    borderRadius: "4px",
    minHeight: "300px",
    cursor: "pointer",
  },
  cardAssigned: {
  ...card,
    backgroundColor: StatsCardBackground,
    borderRadius: "4px",
    minHeight: "300px",
    cursor: "pointer",
  },
  card: {
    ...card,
    backgroundColor: StatsCardBackground,
    borderRadius: "4px",
    minHeight: "300px",
    cursor: "pointer",
  },
  cardHeader: {
    ...cardHeader,
    textAlign: "center",
    position: "relative",
    top: "20px",
    width: "86px"
  },
  color: "#FFF",
  cardHeaderTitle: {
    color: "#FFF",
    fontSize: "22px",
    fontWeight: "400",
    position: "absolute",
    right: "20px",
    top: "20px"
  },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  cardContent: {
    padding: "35px 20px 20px"
  },
  cardContentSubheading: {
    color: "#FFF"
  },
  cardIcon: {
    width: "40px",
    height: "36px",
    fill: "#fff"
  },
  cardAvatar: {
    margin: "10px 8px 10px",
    display: "flex"
  },
  cardCategory: {
    ...defaultFont,
    fontSize: "16px",
    fontWeight: "400",
    marginBottom: "0",
    color: "#FFF",
    margin: "0 0 10px"
  },
  cardTitle: {
    ...defaultFont,
    color: "#FFF",
    fontSize: "20px",
    margin: "1% 0 1.5%"
  },
  cardTitleSmall: {
    color: "#FFF",
    fontWeight: "400",
    lineHeight: "1"
  },
  cardActions: {
    ...cardActions,
    backgroundColor: "#FAFAFA",
    height: "50px",
    margin: 0,
    padding: "0 15px",
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%"
  },
  cardStats: {
    lineHeight: "22px",
    color: "#666",
    fontSize: "11px",
    display: "inline-block",
    margin: "0!important",
    paddingLeft: "20px"
  },
  cardStatsIcon: {
    position: "relative",
    top: "4px",
    width: "16px",
    height: "16px"
  },
  warningCardStatsIcon: {
    color: warningColor
  },
  primaryCardStatsIcon: {
    color: primaryColor
  },
  dangerCardStatsIcon: {
    color: dangerColor
  },
  successCardStatsIcon: {
    color: successColor
  },
  infoCardStatsIcon: {
    color: infoColor
  },
  roseCardStatsIcon: {
    color: roseColor
  },
  grayCardStatsIcon: {
    color: grayColor
  },
  cardStatsLink: {
    color: primaryColor,
    textDecoration: "none",
    ...defaultFont
  }
};

export default statsCardStyle;
