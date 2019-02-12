import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import grey from "@material-ui/core/colors/grey";
import LoadingOverlay from 'react-loading-overlay';
import axios from "axios";
import Particulars from "./Particulars";
import ResumeSection from "./ResumeSection";
import ResumeEntry from "./ResumeEntry";
import EducationEntry from "./EducationEntry.js";
import IconButton from '@material-ui/core/IconButton';
var fileDownload = require('js-file-download');
const styles = {
  root: {
    position: "fixed",
   
    overflowY: "scroll",
    top: "0",
    left: "0",
    background: "#f6f8f6",
    minHeight: "100%",
    width: "100%",
    zIndex: "10000"
  },
  closeIcon: {
    color: grey[500],
    cursor: "pointer",
    position: "absolute",
    right: "50px",
    top: "30px"
  },
  container: {
    margin: "0 auto",
    marginLeft:"18.5%",
    padding: "50px 0 0",
    width: "63%",
   
    position: "absolute",


  },
  sidebar: {
    background: "#00ADF3",
    color: "#FFF"
  },
  spaceAround: {
    display: "flex",
    justifyContent: "space-between"
  },
  title: {
    color: "#00ADF3",
    fontFamily: "Helvetica",
    fontSize: "24px",
    margin: "0"
  },
  download: {
    color: "#00ADF3",
    fontFamily: "Helvetica",
    fontSize: "20px",
    padding: "10px"
  },
  chip: {
    borderRadius: "20px",
    margin: "5px",
    fontSize: "14px",
    padding: "3px 5px"
  },
  skill: {
    color: "#FFF",
    display: "inline-block",
    width: "50%"
  },
  white: {
    color: "#FFF"
  }
};

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingMessage: 'Loading Data...',
      loading: false,
      resumeID: this.props.resumeID,
      jobID: this.props.jobID,
     
      resumeData:{
        Edu: [],
        Email: "example@gmail.com",
        FileName: "bd9e0945-fe42-4e9f-adc0-098bad217efaJesseHong resume.docx",
        ID: 546,
        Name: "Example Name",
        Occupation: "Software Engineer",
        Phone: "555-666-7655",
        Skills: ["saas", "distributed systems", "java", "javascript", "nosql", "sql", "rest", "python", "kafka", "aws"],
        Work: [],
      }
    }
  }

    componentDidMount = () =>{
     
      this.loadData(this.props.resumeID);
   
  }

  loadData = async (resumeID) =>{
     var self=this;
     this.setState({loading: true});
    await axios.get('https://mjtbe.tk/personalresume/'+resumeID)
      
      .then(function (response) {
        console.log("heres the response from /personalresume", response);
        
        if(response["status"]  == 200){
            self.setState({loading: false, resumeData: response.data["Data"], resumeID:resumeID});
            console.log("success in /personalresume", response.data["Data"]);
             

        }
      })
      .catch(function (error) {
        console.log('error in /personalresume ', error);
        self.setState({loadingMessage: 'Error Loading Data...'});
      });
  }

  handleResumeChange = (resumeID) =>{
    this.loadData(resumeID);
  }

  downloadResume = async () =>{
    var self=this;
     this.setState({loading: true});
     console.log("checking resume FileName",self.state.resumeData["FileName"] );
    axios({
          url: 'https://mjtbe.tk/downloadresumefile/9541cf05-852a-426b-bc0b-982b771879dcJesseHong resume.docx',
          method: 'GET',
         responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
         
        }).then((response) => {
          console.log("success in /getresumefile", response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download','00030a1e-f5f9-4ef3-ba76-3d285a4b7771functionalSample.pdf' );
          document.body.appendChild(link);
          link.click();

          //fileDownload(response.data, '00030a1e-f5f9-4ef3-ba76-3d285a4b7771functionalSample.pdf');
        })
      .catch(function (error) {
        console.log('error in /getresumefile ', error);
        self.setState({loadingMessage: 'Error Loading Data...'});
      });

    

  }
  render() {
    const self = this;
    return (
            <LoadingOverlay
                        active={this.state.loading}
                        spinner
                        text={this.state.loadingMessage}
                        
                        >
      <div style={styles.root}>
        <Icon style={styles.closeIcon} onClick={this.props.closeHandler}>
          close
        </Icon>
        <div style={styles.container} >
          <div style={styles.spaceAround}>
            <h3 style={styles.title}>Resume</h3>
            <span style={styles.download} >
              Download<IconButton onClick={this.downloadResume}>
          <Icon>save_alt</Icon>
          </IconButton>
            </span>
          </div>
          <br />
          <br />
          <Divider />

          <Particulars resumeRef={self} jobID={this.state.jobID} matchedRateList={this.props.matchedRateList} resumeID={this.state.resumeID} resumeData={this.state.resumeData}/>
          <Divider />

          <Grid container spacing={24} style={{ marginTop: "0px" }}>
            <Grid item sm={8}>
              <ResumeSection
                icon="watch_later"
                heading="Experience"
                color="#00ADF3"
              >


              {this.state.resumeData["Work"].length > 0 ? this.state.resumeData["Work"].map((current, index) => {
                return ( <ResumeEntry data={current} />)
              }) : (<div> </div>)}
                
                
              </ResumeSection>
              
            </Grid>

            <Grid style={styles.sidebar} item sm={4}>
              <ResumeSection icon="school" heading="Education" color="#FFF">
                
              {this.state.resumeData["Edu"].length > 0 ? this.state.resumeData["Edu"].map((current, index) => {
                return ( <EducationEntry data={current} />)
              }) : (<div> </div>)}
              </ResumeSection>
              <Divider style={{ backgroundColor: "#EEE" }} />
              <ResumeSection
                icon="wb_incandescent"
                heading="Skill"
                color="#FFF"
              >
                {[
                  "Sketch",
                  "Less",
                  "PHP",
                  "Photoshop",
                  "Illustrator",
                  "C++",
                  "Sublime Text",
                  "JavaScript",
                  "InDesign",
                  "jQuery"
                ].map(current => (
                  <Typography variant="body2" style={styles.skill}>{current}</Typography>
                ))}
              </ResumeSection>
            </Grid>
          </Grid>
        </div>
      </div>
      </LoadingOverlay>
    );
  }
}

export default Resume;
