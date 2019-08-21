import React from "react";

import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import grey from "@material-ui/core/colors/grey";

const styles = {
  listItemText: {
    fontSize: "14px"
  },
  listItemIcon: {
    fontSize: "16px",
    height: "20px",
    textAlign: "center"
  }
};

class NumberedListItem extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ListItem>
          <ListItemIcon classes={{ root: this.props.classes.listItemIcon }}>
            <span>{this.props.number}.</span>
          </ListItemIcon>
          <ListItemText
            classes={{ root: this.props.classes.listItemText }}
            primary={this.props.text}
          />
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(NumberedListItem);
