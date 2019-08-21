import React from "react";

const themeColor = "#00ADF3";
const greyBackground = "#F3F3F3";

const iconStyle = {
  cursor: "pointer",
  display: "inline-block",
  fontSize: "14px",
  padding: "10px 5px"
};

const RatingElement = ({ active, ratingValue, ratingHandler }) => (
  <i
    style={
      active
        ? { ...iconStyle, color: themeColor }
        : { ...iconStyle, color: greyBackground }
    }
    className="material-icons"
    onClick={() => ratingHandler(ratingValue)}
  >
    brightness_1
  </i>
);

export default RatingElement;
