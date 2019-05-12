import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";
import {connect} from "react-redux";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import axios from "axios";
import LoadingOverlay from 'react-loading-overlay';
import history from 'index.js';
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
axios.defaults.withCredentials = true;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      isMounted: true,
      loading: false,
      loadingMessage: "Logging In..."
    };
  }
  componentDidMount() {
    console.log("login did mount");
     this.setState({isMounted: true});
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );


  }

  componentDidUpdate(){

  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;

  }

  shouldComponentUpdate = (nextProps, nextState) => {

    console.log("here is nextProps", nextProps);
    console.log("here is currentProps", this.props);
    if(nextProps.loading != this.props.loading){
      console.log("should return false");
      return false;

    }

    else return true;
  }


  handleSubmit = (event) =>{
    event.preventDefault();

    this.setState({loading: true});

    var formData = new FormData(event.target);


    console.log("here is the event.target", event.target);

        var object = {};
       for (var pair of formData){
        console.log(pair[0], pair[1]);
        object[pair[0]] = pair[1];
       }
    var json = JSON.stringify(object);

    console.log("checking JSON", json);

    this.sendData(json);
  }

  sendData = async (form) =>{
    const self = this;
    const { cookies } = this.props;
    console.log("checking cookie in /sendData function of login page", cookies);

     self.dispatchLoading("Logging in...",true);
     let config = {'headers': {
          'content-type': 'multipart/form-data'
        },
        'method': 'post',
      };
     //await this.props.dispatch_login_api("http://206.189.217.219:8087/login", form, config)
   await axios ("http://206.189.217.219:8087/login",{
   method: 'post',
   data:  form,
   headers: {
        'content-type': 'multipart/form-data'
      }

 })
      .then(function (response) {
        console.log("heres the response from /loginseven", response);
        cookies.set(response.headers["x-cookie-header"]);
        console.log("checking cookies", cookies.getAll());

        if(response["status"]  == 200){


            console.log("sucessfull call to /login");


            //history.push('/dashboard');
            cookies.set('Role',response.data["Data"]["Role"], {'maxAge': (24 * 60 * 60)});

            self.handleLogin();
             self.handleLoadingClose();



        }
      })
      .catch(function (error) {
        console.log('error in /login ', error);
        self.setState({loadingMessage: 'There was an issue with your login.  Please try again.'});
        self.handleLoadingClose();
      });
  }
  handleLoadingClose = () =>{
   this.dispatchLoading("Loading", false);
  }

  handleLogin = () => {

 this.props.appRef.handleLoginTrue();
}

dispatchLoading = (loadingMessage, loading) =>{
  loading == true ? this.props.loading_handler_true(loadingMessage) : this.props.loading_handler_false();
}
  render() {
    const { classes,cookies } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">

          <GridItem xs={12} sm={6} md={4}>

            <form onSubmit={this.handleSubmit}>
              <Card login className={classes[this.state.cardAnimaton]}>

                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>Log in</h4>
                  <div className={classes.socialLine}>
                    {[
                      "fab fa-facebook-square",
                      "fab fa-twitter",
                      "fab fa-google-plus"
                    ].map((prop, key) => {
                      return (
                        <Button
                          color="transparent"
                          justIcon
                          key={key}
                          className={classes.customButtonClass}
                        >
                          <i className={prop} />
                        </Button>
                      );
                    })}
                  </div>
                </CardHeader>
                <CardBody>

                  <CustomInput
                    labelText="Email..."
                    id="email"
                    name="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    name="password"
                    type="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button  type="submit" color="rose" simple size="lg" block>
                    Let's Go
                  </Button>
                </CardFooter>

              </Card>
            </form>

          </GridItem>

        </GridContainer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({loadingOverlay}) => {
  return {
    loading: loadingOverlay.loading
  }
}

const mapDispatchToProps = dispatch => ({
  loading_handler_true: (loadingMessage) => dispatch({ type: "LOADING_TRUE", payload: loadingMessage}),
  loading_handler_false: () => dispatch ({type: "LOADING_FALSE"}),
  dispatch_login_api: (url, data, config) => dispatch({type: "API_CALL_REQUEST", url: url , data:data, config:config })
});

export default connect(mapStateToProps,mapDispatchToProps) (withStyles(loginPageStyle)(LoginPage));
