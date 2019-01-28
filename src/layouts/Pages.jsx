import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import {withStyles} from '@material-ui/core/styles';

// core components
import PagesHeader from "components/Header/PagesHeader.jsx";
import Footer from "components/Footer/Footer.jsx";

import pagesRoutes from "routes/pages.jsx";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";
import LoadingOverlay from 'react-loading-overlay';
import bgImage from "assets/img/loginBG.png";

import {AddPropsToRoute} from "variables/general.jsx";

class Pages extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      loadingMessage: 'Logging in...',
    }
  }
  componentDidMount() {
    document.body.style.overflow = "unset";

    console.log("checking props in Pages layout", this.props);
  }
  render() {
    const self = this;
    const { classes, ...rest } = this.props;
    var cookieProp = {"cookies" : this.props.cookies};
    return (
      <div>
        <LoadingOverlay
                active={this.state.loading}
                spinner
                text={this.state.loadingMessage}
                classNamePrefix="MyLoader_"
                >
        <PagesHeader {...rest} />
        <div className={classes.wrapper} ref="wrapper">
          <div
            className={classes.fullPage}
            style={{ backgroundImage: "url(" + bgImage + ")" }}
          >
            <Switch>
              {pagesRoutes.map((prop, key) => {
                if (prop.collapse) {
                  return null;
                }
                if (prop.redirect) {
                  return (
                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                  );
                }
                return (
                  <Route
                    path={prop.path}
                   component={ AddPropsToRoute(AddPropsToRoute(prop.component,cookieProp),{"appRef": this.props.appRef})}
                    
                    key={key}/>
                );
              })}
            </Switch>
            <Footer white />
          </div>
        </div>
        </LoadingOverlay>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(Pages);
