import React from "react";
import { withCookies } from 'react-cookie';
import { Router, Route, Switch } from "react-router-dom";
import indexRoutes from "routes/index.jsx";
import {AddPropsToRoute} from "variables/general.jsx";
import {ProtectedRoute} from "routes/ProtectedRoute.js";
import Dashboard from "layouts/Dashboard.jsx";
import Pages from "layouts/Pages.jsx";
import { createBrowserHistory } from "history";
import hist from 'index.js';
function AddExtraProps(Component, extraProps) {
    return <Component.type {...Component.props} {...extraProps} />;
}


class App extends React.Component {

  constructor(props){
    super(props);

    console.log("checking initial hist", hist, this.props.location);

   
   var bool = this.checkCookieExpiration();

    this.state = {
      loggedIn:  bool,
      prevLocation: this.props.location,

    }

    if (bool){
      this.handleLoginTrue();
    }

  }


componentDidUnmount = () =>{
  console.log("unmounting")
}
  checkCookieExpiration = () =>{
   

    if (this.props.cookies.get('cookie-user') != null)
      return true;
    else return false;

  }

  printTest = (string) =>{
    console.log("got to printTest", string);
    
  }
handleLoginTrue = () =>{
  console.log("got to handleLoginTrue");
  const  prevLocation  = this.state.prevLocation;
  this.setState(
    {
      loggedIn: true,
    },
    () => {
      hist.push(prevLocation || "/dashboard");
    },
  );
}

handleLogOut = () =>{

  this.props.cookies.remove('cookie-user');
  this.setState({loggedIn: false});

}
render() {
   var cookieProp = {"cookies": this.props.cookies};
   const self = this;
      return (
       <Router history={hist}>
         <Switch>
          <Route path={'/pages'}  appRef={self} component={ AddPropsToRoute(AddPropsToRoute(Pages,cookieProp),{"appRef": self})} key={'/pages'} />
          <ProtectedRoute path={'/'} loggedIn={this.state.loggedIn} component={ AddPropsToRoute(AddPropsToRoute(Dashboard,cookieProp),{"appRef": self})} key={'/'} />

         

        </Switch>
     </Router>
    );
   }
  }

  export default withCookies(App);
