import React from "react";

import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";

const styles = {
  root: {
    padding: "20px"
  },
  heading: {
    color: "#00ADF3",
    fontWeight: 400,
    fontSize: "20px"
  }
};

class ContentSection extends React.Component {
  render() {
    return (
      <div className="row">
      <section style={styles.root}>
        <Typography variant="title" gutterBottom style={styles.heading}>
          {this.props.heading}
        </Typography>
        {this.props.children}
      </section>
      </div>
    );
  }
}

export default ContentSection;
