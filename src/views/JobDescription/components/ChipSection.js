import React, { Component } from "react";

import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    margin: "40px 0"
  },
  chip: {
    backgroundColor: "#eeeeee",
    fontSize: "14px",
    justifyContent: "start",
    margin: "5px",
    padding: "0 5px",
    width: "250px"
  }
};

class ChipSection extends React.Component {
  render() {
    return (
      <section style={styles.root}>
        <Typography
          style={{ color: "#00ADF3" }}
          variant="subheading"
          gutterBottom
        >
          {this.props.subheading}
        </Typography>
        {this.props.labels.map(current => {
          current = current.trim();
          return <Chip style={styles.chip} key={current} label={current} />;
        })}
      </section>
    );
  }
}

export default ChipSection;
