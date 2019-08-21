import React from "react";
import axios from "axios";
import LoadingOverlay from 'react-loading-overlay';

import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import SweetAlert from "react-bootstrap-sweetalert";

import CloudUpload from "@material-ui/icons/CloudUpload";
import LocationOn from "@material-ui/icons/LocationOn";

import RegularCard from "components/Card/RegularCard.jsx";
import Divider from "@material-ui/core/Divider";
import ArrowBack from "@material-ui/icons/ArrowBack";

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
const chipData = [{ key: 0, label: 'Jimmy' },
      { key: 1, label: 'John' },
      { key: 2, label: 'Jane' },
      { key: 3, label: 'Jack' },
      { key: 4, label: 'James' },];

const styles = {
  letterhead: {},
  row:{
    marginLeft: "10px",
  },
  logoContainer: {
    height: "100px",
    width: "100px",
    borderRadius: "10%"
  },
  logo: {
    height: "200px",
    width: "200px",
    padding: "5px"
  },
  infoContainer: {

    padding: "30px 0 0 30px"
  },
  subHeadingStyle: {
    color: "#00ADF3",
    position: "absolute",
    right: "20px",
    bottom: "5px"
  },
  subHeadingIcon: {
    margin: "0 5px"
  },
  subHeadingText: {
    fontSize: "24px",
    position: "relative",
    bottom: "4px"
  },
  headline: {},
  title: {},
  margin: {
    margin: "20px 0px",
  },
  a: {
    color: "#00ADF3",
    fontSize: "14px",
    textDecoration: "none",

  },
  iconStyle: {
    fontSize: 20,
    position: "relative",
    top: "0px"
  }
};

const SubHeading = (
  <p style={styles.subHeadingStyle}>
    <CloudUpload style={styles.subHeadingIcon} />{" "}
    <span style={styles.subHeadingText}>Upload A Resume</span>
  </p>
);

class LetterHead extends React.Component {
  state = {
    chipData: [],
    dialogOpen: false,
    checked: [],
      isMounted: false,
      success: false,
      warning: false,
      successDialog: " ",
      warningDialog: " ",
      loadingMessageMatchRecruiter: "Matching Recruiters...",
      matchRecruiterLoading: false,
      recruiterList: [],
 };
 handleDelete = data => async() => {
     if (data.label === 'React') {
       alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
       return;
     }
     this.deleteAssignedRecruiter(data.label);

     this.setState(state => {
       const chipData = [...state.chipData];
       const chipToDelete = chipData.indexOf(data);
       chipData.splice(chipToDelete, 1);
       return { chipData };
     });
   };

   componentDidMount = () =>{
     this.setState({ isMounted: true});
     this.viewAssignedRecuiters();

   }

   deleteAssignedRecruiter = async(recruiter) =>{
     var self = this;
     await axios.post('https://mjtbe.tk/removeassignedjoborder', {JobPostingID: this.props.jobID, AssignedRecruiterName: recruiter })
     .then(function (response) {
       console.log("heres the response from /removeassignedjoborder", response);
       if(response["status"]  == 200){
         if(self.state.isMounted){
           console.log("success in /removeassignjoborder", response.data["Data"]);
           self.setState({success: true, successDialog: "successfully removed "+ recruiter + " from this job order"});

         }
       }
       if(response["status"] ==202){
         if(self.state.isMounted){
           self.setState({warning: true, warningDialog: response.data["ErrorMessage"]})
         }
       }
     })
     .catch(function (error) {
       console.log('error in /removeassignedjobprder ', error);
     });
   }

   viewRecruitersServiceCall = async () =>{
      var self=this;
     await axios.get('https://mjtbe.tk/viewrecruiters')
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

   viewAssignedRecuiters = async() => {
     var self=this;
    await axios.get('https://mjtbe.tk/viewrecruitersassigned/'+this.props.jobID)
        .then(function (response) {
          console.log("heres the response from /viewrecriitersassigned", response);
          if(response["status"]  == 200){
            if(self.state.isMounted){
                  console.log("success in /viewrecruitersassigned", response.data["Data"]);
                  const chipData = response.data["Data"].map((recruiter,index) => {
                    return {key: index, label: recruiter.AssignedRecruiterName}
                  });
                  console.log("checking chipdata", chipData);
                  self.setState({chipData})
                }
              }
              else if(response["status"] == 202){
                if (self.state.isMounted){
                  console.log("no recruiters assigned to this job posting");
                }
              }
        })
        .catch(function (error) {
          console.log('error in /viewrecruietrs ', error);
        });
   }

   handleWarningClose= () =>{
     this.setState({warning: false, warningDialog: ""});
   }

   handleSuccessClose = () =>{
     this.setState({success: false, successDialog: ""})
   }
   handleClose = () => {
      this.setState({ dialogOpen: false});
    };
    handleAssignRecruiter (event){
      console.log("got to handleAssignRecruiter",event);
      this.setState({dialogOpen: true});
    }
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
    matchRecruiterServiceCall = async (recruiterName) =>{
       var self=this;
      await axios.post('https://mjtbe.tk/assignjoborder', {JobPostingID: this.props.jobID, AssignedRecruiterName: recruiterName })
          .then(function (response) {
            console.log("heres the response from /assignJobOrder", response);
            if(response["status"]  == 200){
              if(self.state.isMounted){
              console.log("success in /assignjoborder", response.data["Data"]);
              self.setState(state => {
                const chipData = state.chipData.concat({index: self.state.chipData.length+1, label: recruiterName});
                return{
                  chipData: chipData,
                  success: true,
                  successDialog: "successfully assigned job order"
                }
              })
              }
            }
            if(response["status"] ==202){
              if(self.state.isMounted){
                self.setState({warning: true, warningDialog: response.data["ErrorMessage"]})
              }
            }
          })
          .catch(function (error) {
            console.log('error in /assignjoborder ', error);
          });
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
                 <div className="row">
                       <Typography
                              variant="subheading"
                              gutterBottom
                              style={{ color: '#00ADF3', marginBottom:'10px' ,textAlign: "center", fontSize: "20px",}}
                            >
                          Match job with recruiters
                        </Typography>
                      </div>
                      <div className="row">
                        <Typography
                          variant="subheading"
                          gutterBottom
                          style={{ color: '#666666', marginBottom:'25px' ,textAlign: "center",fontSize: "15px",}}
                        >
                         Choose the recruiters you would like to assign this job posting too:
                        </Typography>
                      </div>
                      <List dense >
                      {
                        this.state.recruiterList.length > 0 ?
                        this.state.recruiterList.map((value,index) => (
                        <ListItem key={index} button>
                          <ListItemAvatar>
                            <Avatar
                              alt={`Avatar n°${index + 1}`}
                              src={'https://img.icons8.com/metro/52/000000/user-male-circle.png'}
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
      <section style={styles.letterhead}>
       <Grid container>
       {this.state.warning == true &&

        <SweetAlert warning  title={this.state.warningDialog}  onConfirm={this.handleWarningClose} />
       }
       {
         this.state.success == true &&
         <SweetAlert success  title={this.state.successDialog}  onConfirm={this.handleSuccessClose} />
       }

          <Grid item md={9}>
            <div style={styles.infoContainer}>
          <Typography


                style={{ color: 'rgb(0, 173, 243)', fontSize: '1.75rem' }}
              >
               Job description
              </Typography>
              </div>
            </Grid>
          </Grid>
         <Divider inset style={{ margin: "20px" }} />
        <Grid container>

          <Grid item md={9}>
            <div style={styles.infoContainer}>
              <div className="row"  style={styles.row}>
              <Typography
                variant="title"
                gutterBottom
                style={{ color: 'rgba(0, 0, 0, 0.87)',fontSize: '16px',marginBottom:'25px' }}
              >

                {this.props.jobData["CompanyName"]}
              </Typography>
              </div>
              <div className="row" style={styles.row} >
              <Typography variant="title" gutterBottom style={{ color: 'rgba(0, 0, 0, 0.87)',fontSize: '20px',marginBottom:'25px' }}>
                {this.props.jobData["JobPosition"]}
              </Typography>
              </div>
              { this.props.jobData["Location"] &&
              (<Typography
                variant="subheading"
                gutterBottom
                style={{ color: 'rgba(0, 0, 0, 0.87)', marginBottom:'25px' }}
              >
                <LocationOn style={{ position: "relative", top: "-2px",color:'rgb(0, 173, 243)' }} />
                <span>{this.props.jobData["Location"]}</span>
              </Typography>)
            }

             {  this.props.cookieRole == 'Admin' ?
             (
              <div>
              <div className="row" style={{margin: "25px 0px"}}>
             { this.state.chipData &&
               this.state.chipData.map( data => {
                 let icon = <TagFacesIcon/>;
                 return (<Chip
             key={data.key}
             icon={icon}
             label={data.label}
              onDelete={this.handleDelete(data)} />)
               })
             }
             </div>
                <div className="row" style={styles.margin}>
                  <Button style={styles.a} variant="outlined"  onClick={this.props.handleAssignRecruiter}>
                         Assign Job to Recruiter
                 </Button>
               </div>
              <div className="row" style={styles.margin}>
                 <Button style={styles.a} variant="outlined"  onClick={this.props.editJobDescription}>

                         Edit Job Description

                 </Button>
               </div>


             </div>

             )
             :

             (<div></div>)
             }

            </div>
          </Grid>
        </Grid>
      </section>
      </div>
    );
  }
}

export default LetterHead;
