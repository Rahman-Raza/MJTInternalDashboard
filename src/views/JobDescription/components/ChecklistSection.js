import React, { Component } from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DoneIcon from "@material-ui/icons/Done";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {},
  listItem: {
    color: "#00ADF3",
    display: "inline-block",
    padding: "0"
  },
  chipContainer: {
    border: "1px solid #00ADF3",
    borderRadius: "25px",
    display: "inline-block",
    height: "42px",
    padding: "5px 10px",
    margin: "10px"
  },
  listItemText: {
    color: "#00ADF3",
    position: "relative",
    top: "-26px",
    left: "20px"
  }
};

class ChecklistSection extends React.Component {
  render() {
    return (
      <section style={styles.root}>
        <Typography style={{ color: "#00ADF3" }} variant="subheading">
          {this.props.subheading}
        </Typography>

        {this.props.labels.filter(function(item) {
  return item != 0;
}).map((current, index) => {
        return (
           <div style={styles.chipContainer} key={index} >
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText style={styles.listItemText} primary={current} />
            </div>

          
          ) 
        })}
      </section>
    );
  }
}

export default ChecklistSection;
