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
import Cookies from 'universal-cookie';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";

import axios from "axios";
axios.defaults.withCredentials = true;
const cookies = new Cookies();
const themeColor = "#00ADF3";
const greyBackground = "#F3F3F3";
const styles = {
   
    textField: {
       
        borderRadius: "5px",
        padding: "5px",
        width: "100%"
    },
   
};


class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      Role: 'Role',


    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  handleSubmit = (event) =>{
     event.preventDefault();

    this.props.loadingRef.setState({loading: true, });

    var formData = new FormData(event.target);

    var cookieUserCheck = cookies.getAll();
    console.log("checking cookies", cookieUserCheck);

     var object = {};
      object['Role'] = this.state.Role;
   
       for (var pair of formData){
        console.log(pair[0], pair[1]);
        object[pair[0]] = pair[1];
       }
    var json = JSON.stringify(object);

    console.log("checking JSON", json);

   this.sendData(json);

 

  }

    sendData = (form) =>{
    const self = this;
    axios ("http://myjobtank.com:8087/register",{
   method: 'post',
   data:  form,
   headers: {
        'content-type': 'multipart/form-data'
      }

 })      
      .then(function (response) {
        console.log("heres the response from /register", response);
 
        if(response["status"]  == 200){
          console.log("sucessfull call to /register");
           self.props.loadingRef.setState({loadingMessage: 'Your Account has been Created'});
           self.props.loadingRef.handleLoadingClose();
          

        }
      })
      .catch(function (error) {
        console.log('error  in register ', error);
        self.props.loadingRef.setState({loadingMessage: 'there was an issue creating your account.  Please try again.'});
        self.props.loadingRef.handleLoadingClose();
      });
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
    handleChange = (event) =>{

        var originalForm = this.state.Role

        originalForm = event.target.value;
        this.setState({Role: originalForm});

       // console.log("checking new values", event.target.name, ": ", event.target.value);
    }
  render() {
    const { classes } = this.props;
    return (

        
            <form onSubmit={this.handleSubmit}>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>Register New User</h4>
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
                    labelText="Name..."
                    id="name"
                    name="Name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}/>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    name="Email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}/>
                  <CustomInput
                    labelText="Password"
                    type="password"
                    id="password"
                    name="Password"
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
                    }}/>
                    <Select
                                        value={this.state.Role}
                                        onChange={this.handleChange}
                                        style={styles.textField}
                                         input={
                                        <Input name="Role" disableUnderline />
                                    }
                                    >
                                        <MenuItem value="Role">
                                        <em>Select Role</em>
                                    </MenuItem>
                                        <MenuItem value={"User"}>User</MenuItem>
                                        <MenuItem value={"Admin"}>Admin</MenuItem>
                                        
                                    </Select>
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit"  color="rose" simple size="lg" block>
                   Submit
                  </Button>
                </CardFooter>
              </Card>
            </form>
  
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(RegisterForm);
