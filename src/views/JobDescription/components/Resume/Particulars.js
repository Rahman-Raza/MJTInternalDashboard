import React from "react";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import orange from "@material-ui/core/colors/orange";
import IconButton from '@material-ui/core/IconButton';
const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    padding: "30px"
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  name: {
    color: "#00ADF3",
    fontFamily: "Roboto",
    margin: "10px 0",
    textTransform: "uppercase"
  },
  details: {
    color: "#00ADF3",
    fontFamily: "Roboto",
    margin: "10px 0"
  },
  controlContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px"
  },
  controlIconContainer: {
    color: "#00ADF3",
    fontSize: "30px",
    margin: "20px 10px 10px",
    border: "1px solid",
    borderColor: "#00ADF3",
    borderRadius: "50%",
    padding: "10px"
  },
  controlIconContainerChecked: {
      color: "#00ADF3",
    fontSize: "30px",
    margin: "20px 10px 10px",
    border: "1px solid",
    borderColor: "#00ADF3",
    borderRadius: "50%",
    padding: "10px",
    backgroundColor: "#00ADF3",
  }
};

class Particulars extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      star: false,
      thumbsDown: false,

    }
  }

  handlePositive = () =>{
    console.log("checking handle handlePositive");

    this.setState({star: true, thumbsDown: false});
    this.sendRating("true");
  }

  handleNegative = () =>{
     console.log("checking handle Negative");
      this.setState({star: false, thumbsDown: true});

      this.sendRating("false");
  }

  sendRating = async (rating) =>{

    console.log("checking parameters jobid, resumeID, rating: ", this.props.jobID, this.props.resumeID, rating);

    var obj = {JobID: this.props.jobID, ResumeID: this.props.resumeID, Rating: rating};
      var json = JSON.stringify(obj);

    console.log("checking json",json);

axios ("https://mjtbe.tk/jdresumerating",{
   method: 'post',
   data:  json,
    headers: {
        'content-type': 'multipart/form-data'
      }
 })
      .then(function (response) {
        console.log("heres the response from /jdresumerating", response);
        
        if(response["status"]  == 200){
          console.log("sucessfull call to /jdresumerating");

        }
      })
      .catch(function (error) {
        console.log('error in /jdresumrating ', error);
      });
  }

  handleNext = () =>{
 var matchratelist = this.props.matchedRateList
    for (var index in matchratelist ){

      if(matchratelist[index]["ID"] == this.props.resumeID){
        if( index < matchratelist.length){
        this.props.resumeRef.handleResumeChange(matchratelist[++index]["ID"]);
      }
        break;
      } 
    }
  }

  handlePrev = () =>{
    var matchratelist = this.props.matchedRateList
    for (var index in matchratelist ){

      if(matchratelist[index]["ID"] == this.props.resumeID){
        if( index > 0){
        this.props.resumeRef.handleResumeChange(matchratelist[index-1]["ID"]);
      }
        break;
      } 
    }
  }
  render() {
    return (
      <section style={styles.root}>
        <div style={styles.iconContainer}>
         <IconButton onClick={this.handlePrev}>
          <Icon>arrow_back_ios</Icon>
          </IconButton>
        </div>
        <div>
          <Typography style={styles.name} variant="headline" align="center">
            {this.props.resumeData["Name"]}
          </Typography>
          <Typography align="center" gutterBottom>
           {this.props.resumeData["Occupation"]}
          </Typography>
          <Typography style={styles.details} align="center" gutterBottom>
            {this.props.resumeData["Phone"]}
          </Typography>
          <Typography style={styles.details} align="center">
           {this.props.resumeData["Email"]}
          </Typography>

          <aside style={styles.controlContainer}>
            <article style={this.state.star ? styles.controlIconContainerChecked : styles.controlIconContainer}>
            <IconButton onClick={this.handlePositive}>
              <Icon>star_rate</Icon>
              </IconButton>
            </article>
            <article style={this.state.thumbsDown ? styles.controlIconContainerChecked : styles.controlIconContainer}>
                 <IconButton onClick={this.handleNegative}>
                <Icon>thumb_down</Icon>
              </IconButton>
            </article>
          </aside>
        </div>
        <div style={styles.iconContainer}>
         <IconButton onClick={this.handleNext}>

          <Icon>arrow_forward_ios</Icon>
          </IconButton>
        </div>
      </section>
    );
  }
}

export default Particulars;
