import React, { Component } from "react";

import Icon from "@material-ui/core/Icon";

import RatingElement from "./RatingElement";

const themeColor = "#00ADF3";
const greyBackground = "#F3F3F3";

const styles = {
  root: {
    display: "inline-block",
    padding: "20px",
    width: "50%"
  }
};

const nameSectionStyle = {
  borderBottom: "1px solid",
  borderColor: greyBackground,
  position: "relative"
};

const nameStyle = {
  color: "#666",
  fontSize: "14px"
};

const closeIconStyle = {
  color: themeColor,
  cursor: "pointer",
  fontSize: "16px",
  position: "absolute",
  right: "0",
  textAlign: "right"
};

const ratingSectionStyle = {
  paddingTop: "10px"
};

const controlButtonStyle = {
  color: themeColor,
  cursor: "pointer",
  fontSize: "20px",
  position: "relative",
  top: "10px",
  margin: "5px"
};

class RatedInput extends Component {
  state = {
    rating: 2,
    ratingArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  };

  addRating = evt => {
    let rating = this.state.rating + 1;
    if (rating > 10) rating = 10;
    this.setState({
      rating
    });
  };

  removeRating = evt => {
    let rating = this.state.rating - 1;
    if (rating < 1) rating = 1;
    this.setState({
      rating
    });
  };

  ratingHandler = rating => {
    this.setState({
      rating
    });
  };

  controlButtonOnMouseOver = evt => {
    evt.target.innerHTML =
      evt.target.innerHTML === "add_circle_outline"
        ? "add_circle"
        : "remove_circle";
    evt.target.style.color = themeColor;
  };

  controlButtonOnMouseOut = evt => {
    evt.target.innerHTML =
      evt.target.innerHTML === "add_circle"
        ? "add_circle_outline"
        : "remove_circle_outline";
    evt.target.style.color = themeColor;
  };

  render() {
    return (
      <div style={styles.root}>
        <section style={nameSectionStyle}>
          <span style={nameStyle}>{this.props.name}</span>
          <i
            style={closeIconStyle}
            className="material-icons"
            onClick={() => this.props.removeHandler(this.props.name)}
          >
            close
          </i>
        </section>

       
      </div>
    );
  }
}

export default RatedInput;
