import React from "react";

import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";

import ResumeEntry from "./ResumeEntry";

const styles = {
  root: {
    margin: "20px 0",
    width: "100%"
  },
  leftPad: {
    paddingLeft: "20px"
  }
};

class ResumeSection extends React.Component {
  render() {
    return (
      <section style={styles.root}>
        <Grid container spacing={0}>
          <Grid item sm={1} />
          <Grid item sm={11}>
            <Typography
              variant="title"
              gutterBottom
              style={{ color: this.props.color, fontWeight: "400" }}
            >
              {this.props.heading}
            </Typography>
            <div style={styles.leftPad}>{this.props.children}</div>
          </Grid>
        </Grid>
      </section>
    );
  }
}

export default ResumeSection;
