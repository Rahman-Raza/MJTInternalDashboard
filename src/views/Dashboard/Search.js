import Icon from "@material-ui/core/Icon";

// @material-ui/core
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";

// @material-ui/icons
import FolderOpen from "@material-ui/icons/FolderOpen";
import React from "react";

const styles = {
  input: {
    padding: "5px"
  },
  underline: {
    "&::before": {
      borderBottom: "2px solid #00ADF3"
    }
  },
  iconStyle: {
    color: "#00ADF3",
    fontSize: "40px",
    position: "relative",
    top: "5px"
  }
};

const Search = props => {
  const { classes } = props;

  return (
    <aside>
      <Input
        classes={{
          input: classes.input,
          underline: classes.underline
        }}
        placeholder="Search Positions"
        startAdornment={<FolderOpen />}
      />
      <Icon
        classes={{
          root: classes.iconStyle
        }}
      >
        search
      </Icon>
    </aside>
  );
};

export default withStyles(styles)(Search);
