import React from "react";
import { withCookies } from 'react-cookie';
import { Router, Route, Switch } from "react-router-dom";
import {connect} from "react-redux";

import indexRoutes from "routes/index.jsx";
import {AddPropsToRoute} from "variables/general.jsx";
import {ProtectedRoute} from "routes/ProtectedRoute.js";
import Dashboard from "layouts/Dashboard.jsx";
import Pages from "layouts/Pages.jsx";
import { createBrowserHistory } from "history";
import hist from 'index.js';
import LoadingOverlay from 'react-loading-overlay';
function AddExtraProps(Component, extraProps) {
    return <Component.type {...Component.props} {...extraProps}/>
  }
class App extends React.Component {

  constructor(props){
    super(props);

    console.log("checking initial hist", hist, this.props.location);

   let cookieProp = {"cookies": props.cookies};
   let bool = this.checkCookieExpiration();
   let LoginComponent = AddPropsToRoute(AddPropsToRoute(Pages,cookieProp),{"appRef": this});
   let DashboardComponent = AddPropsToRoute(AddPropsToRoute(Dashboard,cookieProp),{"appRef": this});

    this.state = {
      loggedIn:  bool,
      prevLocation: hist.location.pathname,
      prevState: hist.location.state,
      LoginComponent: LoginComponent,
      DashboardComponent: DashboardComponent,

    }



  }

  componentDidMount = () =>{
      console.log("checking log in status true");

      if (this.state.loggedIn == true)
        this.handleLoginTrue();

  }



componentWillUnmount = () =>{
  console.log("unmounting")
}
  checkCookieExpiration = () =>{
   console.log("checking this.props.cookies in App", this.props.cookies.getAll());

    if (this.props.cookies.get('Role') != null)
      return true;
    else return false;

  }

  printTest = (string) =>{
    console.log("got to printTest", string);

  }

handleLoginTrue = () =>{
  console.log("got to handleLoginTrue");
  const  prevLocation  = this.state.prevLocation != '/pages/login-page' ? this.state.prevLocation : '/';

  console.log("checking prevLocation", prevLocation);
  const prevState = this.state.prevState;
  this.setState(
    {
      loggedIn: true,
    },
    () => {
      hist.push((prevLocation || "/dashboard"),prevState);
    },
  );
}

handleLogOut = () =>{
  this.props.cookies.remove('Role');
  this.setState({loggedIn: false});

}


render() {



   const self = this;
      return (
       <LoadingOverlay
                active={this.props.loading}
                spinner
                text={this.props.loadingMessage}
                classNamePrefix="MyLoader_"

                >
       <Router history={hist}>
         <Switch>
          <Route path={'/pages'}  appRef={self} component={ this.state.LoginComponent} key={'/pages'} />
          <ProtectedRoute path={'/'} loggedIn={this.state.loggedIn} component={ this.state.DashboardComponent} key={'/'} />

        </Switch>
     </Router>
    </LoadingOverlay>
    );
   }
  }
const mapStateToProps = ({loadingOverlay}) => {
  return{
    loading: loadingOverlay.loading,
    loadingMessage: loadingOverlay.loadingMessage,
    };
};

const mapDispatchToProps = dispatch => ({
  loading_handler: (loadingMessage) => dispatch({ type: "LOADING_TRUE", payload: loadingMessage})
});


  export default connect(mapStateToProps, mapDispatchToProps) (withCookies(App));
