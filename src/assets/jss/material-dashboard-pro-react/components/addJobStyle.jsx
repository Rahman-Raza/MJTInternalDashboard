// ##############################
// // // Dashboard View styles
// #############################

import {
  successColor,
  tooltip
} from "assets/jss/material-dashboard-pro-react.jsx";
import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.jsx";


const addJobStyle = {
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

export default addJobStyle;
