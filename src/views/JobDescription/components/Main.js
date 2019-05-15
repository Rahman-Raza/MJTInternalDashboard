import React, { Component } from "react";
import isEmpty from 'variables/isEmpty.js';
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import Button from "components/CustomButtons/Button.jsx";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import LetterHead from "./LetterHead";
import ContentSection from "./ContentSection";
import NumberedListItem from "./NumberedListItem";
import ChipSection from "./ChipSection";
import ChecklistSection from "./ChecklistSection";
import CandidateCard from "./CandidateCard";
import MatchingRateList from "./MatchingRateList";
import Resume from "./Resume";
import LoadingOverlay from 'react-loading-overlay';

import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import history from 'index.js';


const styles = {
  paper: {
    padding: "20px"
  },
  sidebar: {
    background: "#00ADF3",
    padding: " 1px 50px",
    position: "relative",
    top: "-50px",
    minHeight: "101.9%",
    width: "103%",
  },
  sidebarHeading: {
    color: "#FFF",
    display: "block",
    padding: "0 50px 25px 0",
    margin: "100px 0",
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

  console.log("checking props in Main", props);
    super(props);
    this.state = {
      jobDataPulled: false,
      loadingMessageMatchRecruiter: "Matching Recruiters...",
      matchRecruiterLoading: false,
      isMounted: false,
       checked: [],
      dialogOpen: false,
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
      originalMatchedRateList: [],
      recruiterList: [],
    };
    this.toggleResume = this.toggleResume.bind(this);
    console.log("checking jobID in Main", this.props.jobID);
  }

   componentDidMount = async () =>{
      var self=this;



    this.setState({ isMounted: true});
    this.props.loadingRef(true,"Loading Job Data...");
    await axios.get('http://206.189.217.219:8087/jobpostinginfo/'+this.props.jobID)

      .then(function (response) {
        console.log("heres the response from /jobpostinginfo", response);

        if(response["status"]  == 200){

           if(self.state.isMounted){


            console.log("success in /jobpostinginfo", response.data["Data"]);
             self.matchingRateServiceCall();
              self.setState({ jobData: response.data["Data"], jobDataPulled: true});
             self.props.cookies.get('Role') == 'Admin'? self.viewRecruitersServiceCall() : null;
           }

        }
      })
      .catch(function (error) {
        console.log('error in /jobpostinginfo ', error);
        self.setState({loadingMessage: 'Error Loading Data...'});
        self.handleLoadingClose();
      });
  }

filterResumesServiceCall = async () =>{

}

matchingRateServiceCall =  () =>{
  this.props.loadingRef(true,"Generating Matching Rate List...");
   var self=this;
   axios.get('http://206.189.217.219:8087/listofmatchedresumes/'+this.props.jobID)

      .then(function (response) {
        console.log("heres the response from /listofmatchedresumed", response);

        if(response["status"]  == 200){

           if(self.state.isMounted){
            self.setState({ matchedRateList: response.data["Data"]});
            console.log("success in /matchedRateList", response.data["Data"]);

            self.handleLoadingClose();
          }
        }
      })
      .catch(function (error) {
        console.log('error in /matchedRateList ', error);
         self.setState({loadingMessage: 'Error Loading Matching Rate Service Data...'});
         self.handleLoadingClose();

      });

}

viewRecruitersServiceCall = async () =>{
   var self=this;
  await axios.get('http://206.189.217.219:8087/viewrecruiters')

      .then(function (response) {
        console.log("heres the response from /viewrecriiters", response);

        if(response["status"]  == 200){

          if(self.state.isMounted){

                console.log("success in /viewrecruiters", response.data["Data"]);
                self.setState({ recruiterList: response.data["Data"]});
              }

        }
      })
      .catch(function (error) {
        console.log('error in /viewrecruietrs ', error);

      });

}





matchRecruiterServiceCall = async (recruiterName) =>{

   var self=this;


  await axios.post('http://206.189.217.219:8087/assignjoborder/', {job_id: this.props.jobID, recruiter_name: recruiterName })

      .then(function (response) {
        console.log("heres the response from /assignJobOrder", response);

        if(response["status"]  == 200){

          if(self.state.isMounted){

                console.log("success in /assignJobOrder", response.data["Data"]);


              }

        }
      })
      .catch(function (error) {
        console.log('error in /assignJobOrder ', error);

      });


}


  toggleResume(resumeID) {
    console.log("checking resumeID", resumeID);

    this.setState({resumeID: resumeID});

    this.setState({
      showResume: !this.state.showResume
    });
  }
handleAssignRecruiter (event){
  console.log("got to handleAssignRecruiter",event);
  this.setState({dialogOpen: true});
}

 handleClose = () => {
    this.setState({ dialogOpen: false});
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

   componentWillUnmount = () => {


     this.state.isMounted = false


  };

  handleSubmitMatchRecruiter = () =>{

    var self = this;

    if (this.state.checked.length <= 0){

      self.setState({matchRecruiterLoading: true, loadingMessageMatchRecruiter: "Please select at least one recruiter..."});

      setTimeout(
    function() {

        self.setState({matchRecruiterLoading: false, loadingMessageMatchRecruiter: "Matching Recruiters..."});
        }, 1200);


    }
    else{

    self.setState({matchRecruiterLoading: true});

    console.log("checking checked values", this.state.checked);

     setTimeout(
    function() {


        self.setState({matchRecruiterLoading: false});
        self.handleClose();

    }
    ,
    1200
);


     this.state.checked.map((value, index) => {
      console.log("checked value", this.state.recruiterList[value]["Name"] );

       this.matchRecruiterServiceCall(this.state.recruiterList[value]["Name"]);

     })

   }
  }

  editJobDescription = () =>{

    console.log("validating jobdata before routing to edit job posting", this.state.jobData);

    this.state.jobDataPulled == true ?  history.push('/add-job', {jobData: this.state.jobData }) : history.push('/add-job');
  }

    handleLoadingClose = () =>{


    setTimeout(
    () => {
        this.props.loadingRef(false,"Loading...");
    }
    ,
    500
);
  };

  handleFilterSubmit = async (filterObject = {}) =>{
    this.props.loadingRef(true,"Filtering Resumes");
    console.log("checking data before filterresumeset api call", filterObject);

    var self=this;

    if (isEmpty(filterObject)){

      console.log("is empty filterobject");
      this.setState({matchedRateList: this.state.originalMatchedRateList});
      self.handleLoadingClose();
    }
    else{
         await axios.post('https://mjtbe.tk/filterresumeset', filterObject)
             .then(function (response) {
               console.log("heres the response from /filterresumeset", response);
               if(response["status"]  == 200){
                 if(self.state.isMounted){
                    console.log("Success in /filterresumeset");
                       console.log("success in /filterresumeset", response.data["Data"]);
                          self.handleLoadingClose();
                          self.organizeFilterDataToMatchingRateList(response.data["Data"]["items"]);
                     }
               }
             })
             .catch(function (error) {
               console.log('error in /filterresumeset ', error);
               self.handleLoadingClose();
             });
     }
  }

  organizeFilterDataToMatchingRateList = (data) =>{
    const {matchedRateList} = this.state;

    let originalMatchedRateList = matchedRateList;

    console.log("checking existing matchedRateList", matchedRateList);
    console.log("checking new data coming from filterresumeset", data);

    let newMatchedRateList = data.map((resumeData) => {
      return {ID: resumeData["ID"], Name: resumeData["Name"], Email: resumeData["Email"], Phone: resumeData["Phone"]};
    });

    console.log("checking new cleaned matchedratelist", newMatchedRateList);

    this.setState({matchedRateList: newMatchedRateList, originalMatchedRateList: originalMatchedRateList});



  }



  render() {
    return (
    <div>

    <Dialog
        open={this.state.dialogOpen}
        onClose={this.handleClose}
      aria-labelledby="form-dialog-title">
       <LoadingOverlay
                        active={this.state.matchRecruiterLoading}
                        spinner
                        text={this.state.loadingMessageMatchRecruiter}

                        >
         <DialogContent style={{padding: "40px 60px"}}>


               <Typography
                      variant="subheading"
                      gutterBottom
                      style={{ color: '#00ADF3', marginBottom:'10px' ,textAlign: "center", fontSize: "20px",}}
                    >

                      Match job with recruiters
                    </Typography>

                    <Typography
                      variant="subheading"
                      gutterBottom
                      style={{ color: '#666666', marginBottom:'25px' ,textAlign: "center",fontSize: "15px",}}
                    >

                     Choose the recruiters you would like to assign this job posting too:
                    </Typography>

                    <List dense >
                    {

                      this.state.recruiterList.length > 0 ?
                      this.state.recruiterList.map((value,index) => (
                      <ListItem key={index} button>
                        <ListItemAvatar>
                          <Avatar
                            alt={`Avatar n°${index + 1}`}
                            src={'assets/img/people/'+(index + 1).toString()+'.jpg'}
                          />
                        </ListItemAvatar>
                        <ListItemText primary={value["Name"]} />
                        <ListItemSecondaryAction>
                          <Checkbox
                            color="primary"
                            onChange={this.handleToggle(index)}
                            checked={this.state.checked.indexOf(index) !== -1}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))
                      : (<div></div>)
                    }
                  </List>

                    <Button onClick={this.handleSubmitMatchRecruiter}  color="rose" simple size="lg" block>
                        Match
                    </Button>

         </DialogContent>
          </LoadingOverlay>
      </Dialog>
      <div className="container">
        {this.state.showResume ? (
          <Resume resumeID={this.state.resumeID} matchedRateList={this.state.matchedRateList} jobID={this.props.jobID} closeHandler={this.toggleResume} />
        ) : null}

        <Grid container spacing={0}>
          <Grid item sm={7}>
            <Paper classes={{ root: this.props.classes.paper }} elevation={0}>
              <LetterHead editJobDescription={this.editJobDescription} handleAssignRecruiter={this.handleAssignRecruiter.bind(this)} jobData={this.state.jobData} cookieRole={this.props.cookies.get('Role')} />

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
                    this.state.jobData["Commission"] === "true" ? "Commmission":"0",
                    this.state.jobData["Bonuses"] === "true"? "Bonuses":"0",
                    this.state.jobData["OvertimePay"] === "true"? "Overtime Pay":"0",
                    this.state.jobData["TravelMealHousingAllowance"] === "true"? "Travel / Meal / Housing Allowance":"0",
                    this.state.jobData["HealthBenefits"] === "true"? "Health Benefits":"0",
                    this.state.jobData["Wellness"] === "true" ? "Wellness":"0",

                  ]}
                />
              </ContentSection>
            </Paper>
          </Grid>

          <Grid item sm={5}>
            <MatchingRateList data={this.state.matchedRateList}  handleFilterSubmit={this.handleFilterSubmit} toggleResume={this.toggleResume} />
          </Grid>
        </Grid>
      </div>
</div>
    );
  }
}


export default  withStyles(styles)(Main);
