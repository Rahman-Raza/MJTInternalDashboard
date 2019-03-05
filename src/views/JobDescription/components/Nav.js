import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import blue from "@material-ui/core/colors/blue";
import ArrowBack from "@material-ui/icons/ArrowBack";
import history from 'index.js';
import IconButton from '@material-ui/core/IconButton';
import "./Nav.scss";

const styles = {
  nav: {
    
    marginBottom: "20px",
    marginLeft: "25px",
  },
  a: {
    color: "#00ADF3",
    fontSize: "24px",
    textDecoration: "none"
  },
  iconStyle: {
    fontSize: 30,
    position: "relative",
    top: "0px"
  }
};

class Nav extends React.Component {

  handlePageChange = () =>{
    history.goBack();
  }
  render() {
    return (
      <nav className="nav" style={styles.nav}>
        <Grid container justify="flex-start">
          <Grid md={8} item >
           <IconButton style={{borderRadius: "0px"}} disableRipple={true} onClick={this.handlePageChange}>
                
             
            <a style={styles.a} >
              <ArrowBack style={styles.iconStyle} /> Job Positions
            </a>
             </IconButton>
          </Grid>
          <Grid item justify="space-around" />
        </Grid>
      </nav>
    );
  }
}

export default Nav;
