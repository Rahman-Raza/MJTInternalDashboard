import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

const styles = {
  appBar: {
    backgroundColor: '#FFF',
    boxShadow: '0 0 4px 0 rgba(0,0,0,.15)',
    color: grey[900],
  },
  typography: {
    position: 'relative',
    left: '20%',
  },
};

class Header extends React.Component {
  render() {
    return (
      <AppBar
        classes={{
          root: this.props.classes.appBar,
        }}
        position="static">
        <Toolbar>
          <Typography
            classes={{root: this.props.classes.typography}}
            variant="title"
            color="inherit">
            My Job Tank
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
