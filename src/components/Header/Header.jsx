import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Section from "components/Section/Section.jsx";
// material-ui icons
import Menu from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";
import Background from "assets/img/nav-bg2.png";
// core components
import HeaderLinks from "./HeaderLinks";
import Button from "components/CustomButtons/Button.jsx";
import logo from "assets/img/logo-mjt.png";
import headerStyle from "assets/jss/material-dashboard-pro-react/components/headerStyle.jsx";

function Header({ ...props }) {
  function makeBrand() {
    var name;
    props.routes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      }
      if (prop.path === props.location.pathname) {
        name = prop.name;
      }
      return null;
    });
    if(name){
      return name;
    } else {
      return "Default Brand Name";
    }
  }
  const { classes, color, rtlActive } = props;

  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  const sidebarMinimize =
    classes.sidebarMinimize +
    " " +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive
    });
  return (
          <Section
          containerSize={75}
          style={{
            background: "url(" + Background + ") repeat-x",
           
            paddingBottom: "5%"
          }}
        >
    <AppBar className={classes.appBar + appBarClasses}>
   
      <Toolbar className={classes.container}>
        
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href="/dashboard" className={classes.title} color="transparent">
             
          <img  src={logo} alt="Logo" className="site-logo" />
         
        
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <HeaderLinks appRef={props.appRef} cookies={props.cookies} rtlActive={rtlActive} />
        </Hidden>
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
      
    </AppBar>
    </Section>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool
};

export default withStyles(headerStyle)(Header);