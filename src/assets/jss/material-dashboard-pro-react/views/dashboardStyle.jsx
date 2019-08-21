// ##############################
// // // Dashboard View styles
// #############################

import {
  successColor,
  tooltip
} from "assets/jss/material-dashboard-pro-react.jsx";
import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.jsx";


const dashboardStyle = {
  pagination: {
    display: "inline-block",
    paddingLeft: "0",
    margin: "20px 0",
    borderRadius: "4px",
  },
  successText: {
    color: successColor
  },
  upArrowCardCategory: {
    width: 14,
    height: 14
  },
  underChartIcons: {
    width: "17px",
    height: "17px"
  },
  tooltip,
   ...buttonStyle
};

export default dashboardStyle;
