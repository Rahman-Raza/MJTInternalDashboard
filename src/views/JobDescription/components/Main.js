import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import LetterHead from "./LetterHead";
import ContentSection from "./ContentSection";
import NumberedListItem from "./NumberedListItem";
import ChipSection from "./ChipSection";
import ChecklistSection from "./ChecklistSection";
import CandidateCard from "./CandidateCard";
import Resume from "./Resume";
import LoadingOverlay from 'react-loading-overlay';
const styles = {
  paper: {
    padding: "20px"
  },
  sidebar: {
    background: "#00ADF3",
    padding: " 1px 50px",
    position: "relative",
    top: "-50px"
  },
  sidebarHeading: {
    color: "#FFF",
    display: "block",
    padding: "0 50px 50px 0",
    margin: "75px 0",
    borderBottom: "1px solid #FFF"
  },
  responsibility: {
    list: {
      fontSize: "20px",
      color:'#666666'
    },
    listItem: {
      fontSize: "20px",
      margin: "5px 0",
      color:'#666666',
    }
  }
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResume: false,
      loadingMessage: 'Loading Data...',
      loading: false,
      resumeID: 0,
      jobData: {
        BaseSalary: "$100k-$200k",
        Bonuses: false,
        Commission: false,
        CompanyName: "Company Name",
        CompanySize: "10000",
        CreatedAt: "2018-07-29T23:32:38Z",
        DeletedAt: null,
        Education: "High School Diploma",
        Email: "lynn@gmail.com",
        EmploymentType: "2 - 5 Years",
        FirstName: "Lynn",
        HealthBenefits: false,
        ID: 9,
        JobPosition: "UI/UX Designer",
        KeyPoints: "somethign about goaosd;okas apoj fapoj aspdo'k ['ka'pofk agj pa'sjkdfp'ook K↵[SKDG 'POAKSDFPO'Kf",
        Language: '[ "English","Spanish"]',
        LastName: "Rogers",
        Location: "New York, NY",
        Matchingservice: "",
        OvertimePay: false,
        PhoneNumber: "111-111-3333",
        RequiredSkills: '["Python","Java"]',
        Status: "New",
        Summary: "FareHarbor, a Booking.com company, is looking for a full time, on-site Quality Assurance Associate to join our team in San Francisco. We?re a quickly growing company with a robust product that tens of thousands of people use to run their businesses every day. You will work closely with the FareHarbor Product Team in both San Francisco and Amsterdam to source, aggregate, and triage issue reports as well as test new and existing features. Must have strong analytical thinking, problem-solving, and attention to detail.↵↵",
        TravelMealHousingAllowance: false,
        TravelRequirement: false,
        UpdatedAt: "2018-07-29T23:32:38Z",
        Wellness: false,
        WorkExperience: "2 - 5 Years",
      },
      matchedRateList: [],
    };
    this.toggleResume = this.toggleResume.bind(this);
    console.log("checking jobID in Main", this.props.jobID);
  }

   componentDidMount = async () =>{
      var self=this;

    this.setState({loading: true});
    await axios.get('http://18.206.187.45:8080/jobpostinginfo/'+this.props.jobID)
      
      .then(function (response) {
        console.log("heres the response from /jobpostinginfo", response);
        
        if(response["status"]  == 200){
            self.setState({loading: false, jobData: response.data["Data"]});
            console.log("success in /jobpostinginfo", response.data["Data"]);
             self.matchingRateServiceCall();

        }
      })
      .catch(function (error) {
        console.log('error in /jobpostinginfo ', error);
        self.setState({loadingMessage: 'Error Loading Data...'});
      });
  }

matchingRateServiceCall = async () =>{
   var self=this;
  await axios.get('http://18.206.187.45:8080/listofmatchedresumes/'+this.props.jobID)
      
      .then(function (response) {
        console.log("heres the response from /listofmatchedresumed", response);
        
        if(response["status"]  == 200){
            self.setState({ matchedRateList: response.data["Data"]});
            console.log("success in /matchedRateList", response.data["Data"]);

        }
      })
      .catch(function (error) {
        console.log('error in /matchedRateList ', error);
        
      });

}
 

  toggleResume(resumeID) {
    console.log("checking resumeID", resumeID);

    this.setState({resumeID: resumeID});

    this.setState({
      showResume: !this.state.showResume
    });
  }

  render() {
    return (
      <LoadingOverlay
                        active={this.state.loading}
                        spinner
                        text={this.state.loadingMessage}
                        
                        >
      <div className="container">
        {this.state.showResume ? (
          <Resume resumeID={this.state.resumeID} matchedRateList={this.state.matchedRateList} jobID={this.props.jobID} closeHandler={this.toggleResume} />
        ) : null}

        <Grid container spacing={0}>
          <Grid item sm={7}>
            <Paper classes={{ root: this.props.classes.paper }} elevation={0}>
              <LetterHead jobData={this.state.jobData}/>

              <Divider inset style={{ margin: "40px" }} />

              <ul style={{ listStyleType: "none", fontSize: "20px",marginBottom:"25px" }}>
                <li>- {this.state.jobData["WorkExperience"]}</li>
                <li>- {this.state.jobData["Education"]}</li>
              </ul>

              <ContentSection heading="Summary">
                <Typography
                  style={{ padding: "20px", lineHeight: "30px", color:'#666666' }}
                  variant="subheading"
                  gutterBottom
                >
                {this.state.jobData["Summary"]}
                </Typography>
              </ContentSection>

              <ContentSection heading="Key Responsibilities">
                <Typography
                  style={{ padding: "20px", lineHeight: "30px", color:'#666666' }}
                  variant="subheading"
                  gutterBottom
                >
                {this.state.jobData["KeyPoints"]}
                </Typography>
              </ContentSection>

              <Divider />

              <ContentSection heading="Required Skills">
                <ChipSection subheading="Language" labels={JSON.parse(this.state.jobData["Language"])} />
                <ChipSection subheading="Required Skills" labels={JSON.parse(this.state.jobData["RequiredSkills"])} />
              </ContentSection>

              <ContentSection heading="Compensation">
                <ChipSection
                  subheading="Salary Range"
                  labels={[this.state.jobData["BaseSalary"]]}
                />
                <ChecklistSection
                  subheading="Benefits"
                  labels={[
                    this.state.jobData["Commission"] === true ? "Commmission":"0",
                    this.state.jobData["Bonuses"] === true? "Bonuses":"0",
                    this.state.jobData["OvertimePay"] === true? "Overtime Pay":"0",
                    this.state.jobData["TravelMealHousingAllowance"] === true? "Travel / Meal / Housing Allowance":"0",
                    this.state.jobData["HealthBenefits"] === true? "Health Benefits":"0",
                    this.state.jobData["Wellness"] === true? "Wellness":"0",
                    
                  ]}
                />
              </ContentSection>
            </Paper>
          </Grid>

          <Grid item sm={5}>
            <aside style={styles.sidebar} className="sidebar">
              <h3 style={styles.sidebarHeading}>Matching Rate List</h3>
              {
                this.state.matchedRateList.length > 0 ? 
              (

               this.state.matchedRateList.map((current, index) => {
                  return (
                     <CandidateCard
                      resumeToggler={this.toggleResume}
                      percentage={current["ResumeScore"]}
                      data={current}

                      />
          
                  ) 
               })
              
              )
              :
              (<div style={{padding:"620px"
            }}> </div>)
    
              
              }
            </aside>
          </Grid>
        </Grid>
      </div>
      </LoadingOverlay>
    );
  }
}

export default withStyles(styles)(Main);
