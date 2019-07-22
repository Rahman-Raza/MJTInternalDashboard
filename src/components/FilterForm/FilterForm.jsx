import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Search from "@material-ui/icons/Search";
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
        minWidth: "90%"
    },
   
};


class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
     keyword: 'keyword',
      category: 'category',
     


    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      400
    );
  }

  handleSubmit = (event) =>{
   

  event.preventDefault();

    

    var formData = new FormData(event.target);

   

     var object = {};
      object['category'] = this.state.category;
   
       for (var pair of formData){
        console.log(pair[0], pair[1]);
        object[pair[0]] = pair[1];
       }
   

    console.log("checking JSON", object);

    this.props.filterJobs("",object);

    this.props.closeRef();

   

  }


  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
    handleChange = (event) =>{

        var originalForm = this.state.category

        originalForm = event.target.value;
        this.setState({category: originalForm});

       // console.log("checking new values", event.target.name, ": ", event.target.value);
    }
  render() {
    const { classes } = this.props;
    const {formData} = this.state;
    return (

        
            <form onSubmit={this.handleSubmit}>
              <Card className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>筛选职位</h4>
                 
                </CardHeader>
                <CardBody>
                     
                  <CustomInput

                    labelText="关键字查询"
                    id="keyword"
                    name="keyword"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Search className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}/>
                 
                    <Select
                                        value={this.state.category}
                                        onChange={this.handleChange}
                                        style={styles.textField}
                                         input={
                                        <Input name="category" disableUnderline />
                                    }
                                    >
                                        <MenuItem value="category">
                                        <em>选择分类</em>
                                    </MenuItem>
                                        <MenuItem value={"cname"}>公司名称</MenuItem>
                                        <MenuItem value={"status"}>Status</MenuItem>
                                         <MenuItem value={"position"}>Position</MenuItem>
                                         <MenuItem value={"location"}>Location</MenuItem>
                                         <MenuItem value={"salary"}>Salary</MenuItem>
                                         <MenuItem value={"csize"}>Company Size</MenuItem>
                                         <MenuItem value={"emptype"}>Employment Type</MenuItem>
                                        
                                    </Select>
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit"  color="rose" simple size="lg" block>
                   Filter
                  </Button>
                </CardFooter>
              </Card>
            </form>
  
    );
  }
}

FilterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  filterJobs: PropTypes.func.isRequired,
  closeRef: PropTypes.func.isRequired,
};

export default withStyles(loginPageStyle)(FilterForm);
