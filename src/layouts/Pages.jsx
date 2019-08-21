import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import {connect} from "react-redux";

// @material-ui/core components
import {withStyles} from '@material-ui/core/styles';

// core components
import PagesHeader from "components/Header/PagesHeader.jsx";
import Footer from "components/Footer/Footer.jsx";

import pagesRoutes from "routes/pages.jsx";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";

import bgImage from "assets/img/loginBG.png";

import {AddPropsToRoute} from "variables/general.jsx";

class Pages extends React.Component {
  constructor(props){
    super(props);
    
  }
  componentDidMount() {
    document.body.style.overflow = "unset";

    console.log("checking props in Pages layout", this.props);
  }

  shouldComponentUpdate = (nextProps, nextState) => {


    if(nextProps.loading != this.props.loading){
      return false;
    }

    else return true;
  }
  render() {
    const self = this;
    const { classes, ...rest } = this.props;
    var cookieProp = {"cookies" : this.props.cookies};
    return (
      <div>

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

      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({loadingOverlay}) => {
  return {
    loading: loadingOverlay.loading
  }
}
export default connect(mapStateToProps) ( withStyles(pagesStyle)(Pages));
