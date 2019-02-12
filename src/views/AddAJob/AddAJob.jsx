import React from "react";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import LoadingOverlay from 'react-loading-overlay';
import {
  TextValidator,
  ValidatorForm,
  SelectValidator
} from "react-material-ui-form-validator";
import RatedInputContainer from "./addAJob/RatedInputContainer.js";

import BenefitsSection from "./addAJob/BenefitsSection.js";

import bgImage from "assets/img/job-position-background.png";
import history from 'index.js';


const themeColor = "#00ADF3";
const greyBackground = "#F3F3F3";


const styles = {
    rootContainer: {
        background: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        paddingTop: "50px"
    },
    paper: {
        width: "80%",
        margin: "0 auto",
        padding: "0 50px"
    },
    root: {
        display: "flex",
        justifyContent: "center",
        padding: "30px 0 30px",
        width: "100%"
    },
    logoContainer: {
        border: "1px solid orange",
        borderRadius: "500px",
        width: "100px",
        color: "orange",
        padding: "30px 10px 10px 10px",
        lineHeight: "15px",
        fontWeight: "bold",
        height: "100px",
        display: "flex",
        alignitems: "center",
        textAlign: "center"
    },
    inputContainer: {
        display: "inline-block",
        padding: "20px",
        width: "50%"
    },
    textLabel: {
        color: themeColor,
        fontFamily: "Roboto",
        fontWeight: "400"
    },
    textField: {
        background: greyBackground,
        borderRadius: "20px",
        padding: "5px",
        width: "100%"
    },
    chip: {
        color: themeColor,
        display: "inline-block",
        fontFamily: "Roboto",
        fontWeight: "400",
        borderRadius: "25px",
        padding: "0 5px",
        width: "50%",

        iconStyle: {
            color: themeColor
        }
    },
    divider: {
        margin: "30px 0"
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center"
    },
    button: {
        color: themeColor,
        borderColor: themeColor,
        borderRadius: "25px",
        width: "200px",
        margin: "0 20px"
    }
};

class AddAJob extends React.Component {

    constructor(props){
        super();
        this.state = {

            loading: false,
            loadingMessage: 'Sending your job order to our team...',
            formData:{
                EmploymentType: '',
                SalaryRange: '',
                WorkExperience: '',
                CompanyName: '',
                CompanySize: '',
                JobPosition: '',
                Location: '',
                Summary: '',
                KeyPoints: '',


            }
        }
    }

    handleSubmit = () =>{
        
        this.setState({loading: true, loadingMessage: 'Sending your job order to our team...'})

         var submitForm = this.state.formData;
         var benefits = this.BenefitsContainer.returnInfo();

         submitForm["Language"] = JSON.stringify(this.LanguagesContainer.returnInfo());
         submitForm["RequiredSkills"] = JSON.stringify(this.SkillsContainer.returnInfo());

         for (var key in benefits){
            submitForm[key] = benefits[key];
         }

         console.log("checking final form", submitForm);

         this.sendPostData(submitForm);
}

    handleChange = (event) =>{

        var originalForm = this.state.formData;

        originalForm[event.target.name] = event.target.value;
        this.setState({formData: originalForm});

        console.log("checking new values", event.target.name, ": ", event.target.value);
    }

     handleFormErrors(errors) {
    console.log("there were errors in the form ", errors);
  }

  sendPostData = async (form) =>{

    var json = JSON.stringify(form);

    const self = this;

    await axios("https://mjtbe.tk/jobposting", {
     method: 'post',
      data: json,
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      
      .then(function (response) {
        console.log("heres the response from /jobposting", response);
        
        if(response["status"]  == 200){
          console.log("sucessfull call to /jobposting");
          self.setState({loadingMessage: 'Your job order was recieved!'});
          self.handleLoadingClose();
         
          
        }
      })
      .catch(function (error) {
        console.log('error in /jobposting ', error);
      });
  }

  handleGoBack = () =>{
    history.goBack();
  }
handleLoadingClose = () =>{

    const self = this;
    setTimeout(
    function() {
        self.setState({loading: false});
        self.handleGoBack()
    },
    3000
);
 

  }

    render() {
           const { formData, submitted } = this.state;
        return (
                <LoadingOverlay
                active={this.state.loading}
                spinner
                text={this.state.loadingMessage}
                classNamePrefix="MyLoader_"
                >
            <div style={styles.rootContainer}>
                <Paper style={styles.paper}>
                    <div style={styles.root}>
                        <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                            onError={errors => this.handleFormErrors(errors)}>
                          
                            <div style={styles.inputContainer}>
                                <p style={styles.textLabel}>Company Name</p>
                                <TextValidator
                                    onChange={this.handleChange}
                                     value={formData.CompanyName}
                                    id="CompanyName"
                                    name="CompanyName"
                                    style={styles.textField}
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                    validators={["required", "isString"]}
                                    errorMessages={[
                                      "this field is required",
                                      "please enter a valid company name"
                                    ]}
                                />
                            </div>
                          
                           
                            <div style={styles.inputContainer}>
                                <p style={styles.textLabel}>Job Position</p>
                                <TextValidator
                                 onChange={this.handleChange}
                                    value={formData.JobPosition}
                                    name="JobPosition"
                                    style={styles.textField}
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                    validators={["required", "isString"]}
                                    errorMessages={[
                                      "this field is required",
                                      "please enter a valid Job Position"
                                    ]}
                                />
                               
                            </div>
                        
                     
                            <div style={styles.inputContainer}>
                                <p style={styles.textLabel}>Company Size</p>
                                <TextValidator
                                 onChange={this.handleChange}
                                    value={formData.CompanySize}
                                    name="CompanySize"
                                    style={styles.textField}
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                    validators={["required", "isNumber", "minNumber:1"]}
                                    errorMessages={[
                                      "this field is required",
                                      "Please enter a number",
                                      "Please enter a number greater than zero"
                                    ]}
                                />
                            </div>
                        
                            
                            <div style={styles.inputContainer}>
                                <p style={styles.textLabel}>Employment Type</p>
                                
                                    <Select
                                        value={this.state.formData["EmploymentType"]}
                                        onChange={this.handleChange}
                                        style={styles.textField}
                                         input={
                                        <Input name="EmploymentType" disableUnderline />
                                    }
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Full-time"}>Full-time</MenuItem>
                                        <MenuItem value={"Full-time (Contactor)"}>Full-time (Contactor)</MenuItem>
                                        <MenuItem value={"Part-time"}>Part-time</MenuItem>
                                         <MenuItem value={"Part-time (Contactor)"}>Part-time (Contactor)</MenuItem>
                                          <MenuItem value={"Intern"}>Intern</MenuItem>
                                    </Select>
                                
                            </div>
                           
                         
                            <div style={styles.inputContainer}>
                                <p style={styles.textLabel}>Work Experience</p>
                                <Select
                                 onChange={this.handleChange}
                                    value={formData["WorkExperience"]}
                                    style={styles.textField}
                                    input={
                                        <Input name="WorkExperience" disableUnderline />
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"0 - 2 Years"}>0 - 2 Years</MenuItem>
                                    <MenuItem value={"2 - 5 Years"}>2 - 5 Years</MenuItem>
                                    <MenuItem value={"5 - 10 Years"}>5 - 10 Years</MenuItem>
                                    <MenuItem value={"5 - 10 Years"}>10+ Years</MenuItem>
                                </Select>
                            </div>
                      
                           
                            <div style={styles.inputContainer}>
                                <p style={styles.textLabel}>Location</p>
                                <TextField
                                 onChange={this.handleChange}
                                    value={formData["Location"]}
                                    name="Location"
                                    style={styles.textField}
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                />
                            </div>

                         

                            <Divider style={styles.divider} />
                       
                            <div>
                                <p style={styles.textLabel}>Summary</p>
                                <TextValidator
                                 onChange={this.handleChange}
                                 
                                    id="textarea"
                                    multiline
                                    rows="4"
                                    margin="normal"
                                    value={formData.Summary}
                                    name="Summary"
                                    style={styles.textField}
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                    validators={["required", "isString", "minStringLength:80"]}
                                    errorMessages={[
                                      "this field is required",
                                      "Please enter a valid description",
                                      "Please enter at least 80 characters"
                                    ]}
                                />
                            </div>
                       
                     
                            <div>
                                <p style={styles.textLabel}>
                                    Key Responsibilities
                                </p>
                               <TextValidator
                                 onChange={this.handleChange}
                                     value={formData.KeyPoints}
                                    id="textarea"
                                    multiline
                                    rows="4"
                                    margin="normal"
                                    name="KeyPoints"
                                    style={styles.textField}
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                    validators={["required", "isString", "minStringLength:80"]}
                                    errorMessages={[
                                      "this field is required",
                                      "Please enter a valid description",
                                      "Please enter at least 80 characters"
                                    ]}
                                />
                               
                            </div>
                          
                            <Divider style={styles.divider} />

                            <RatedInputContainer
                             onRef={(ref) => {this.LanguagesContainer = ref}}
                                title="Languages"
                                dataType="Languages"
                                defaultValues={["English", "Spanish"]}
                            />

                            <RatedInputContainer
                            onRef={(ref) => {this.SkillsContainer = ref}}
                                title="Key Skills"
                                dataType="Skills"
                                defaultValues={["Python", "JavaScript"]}
                            />

                            <Divider style={styles.divider} />

                            <p style={styles.textLabel}>Benefits</p>
                            <BenefitsSection
                                onRef={(ref) => {this.BenefitsContainer = ref}}
                                inputs={[
            {
              name: "OvertimePay",
              label: "Overtime"
            },
            {
              name: "Commission",
              label: "Commission"
            },
            {
              name: "Bonuses",
              label: "Bonuses"
            },
            {
              name: "HealthBenefits",
              label: "Health Benefits"
            },
            {
              name: "Wellness",
              label: "Wellness"
            },
            {
              name: "TravelMealHousingAllowance",
              label: "Travel / Meal / Housing Allowance"
            }
          ]}/>
                          

                            <div
                                style={{
                                    ...styles.inputContainer,
                                    margin: "40px 0"
                                }}
                            >
                                <p style={styles.textLabel}>Salary Range</p>
                                <Select
                                 onChange={this.handleChange}
                                    value={this.state.formData["SalaryRange"]}
                                    style={styles.textField}
                                    input={
                                        <Input name="SalaryRange" disableUnderline />
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"$0-$50,000"}>$0-$50,000</MenuItem>
                                    <MenuItem value={"$50,000 - $100,000"}>$50,000 - $100,000</MenuItem>
                                    <MenuItem value={"$100,000 - $250,000"}>$100,000 - $250,000</MenuItem>
                                    <MenuItem value={"$250k+"}>$250k+</MenuItem>
                                </Select>
                            </div>

                            <section style={styles.buttonContainer}>
                                <Button
                                    variant="outlined"
                                    style={styles.button}
                                    onClick={this.handleGoBack}
                                >
                                    Cancel
                                </Button>
                                <Button
                                   type="submit"
                                    variant="raised"
                                    style={{
                                        ...styles.button,
                                        color: "#FFF",
                                        backgroundColor: themeColor
                                    }}
                                >
                                    Submit
                                </Button>
                            </section>
                           
                            </ValidatorForm>
                    </div>
                </Paper>
            </div>
            </LoadingOverlay>
        );
    }
}

export default AddAJob;