import React from "react";

import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";

import CloudUpload from "@material-ui/icons/CloudUpload";
import LocationOn from "@material-ui/icons/LocationOn";

import RegularCard from "components/Card/RegularCard.jsx";
import Divider from "@material-ui/core/Divider";
const styles = {
  letterhead: {},
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
    marginLeft: "30px",
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
  title: {}
};

const SubHeading = (
  <p style={styles.subHeadingStyle}>
    <CloudUpload style={styles.subHeadingIcon} />{" "}
    <span style={styles.subHeadingText}>Upload A Resume</span>
  </p>
);

class LetterHead extends React.Component {
  render() {
    return (
      <section style={styles.letterhead}>
       <Grid container>
          
          <Grid item md={9}>
            <div style={styles.infoContainer}>
          <Typography
                
                gutterBottom
                style={{ color: 'rgb(0, 173, 243)', fontSize: '20px' }}
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
              
              <Typography
                variant="title"
                gutterBottom
                style={{ color: 'rgba(0, 0, 0, 0.87)',fontSize: '16px',marginBottom:'25px' }}
              >
                {this.props.jobData["CompanyName"]}
              </Typography>
              <Typography variant="display1" gutterBottom style={{ color: 'rgba(0, 0, 0, 0.87)',fontSize: '20px',marginBottom:'25px' }}>
                {this.props.jobData["JobPosition"]}
              </Typography>
              <Typography
                variant="subheading"
                gutterBottom
                style={{ color: 'rgba(0, 0, 0, 0.87)', marginBottom:'25px' }}
              >
                <LocationOn style={{ position: "relative", top: "5px",color:'rgb(0, 173, 243)' }} />
                <span>{this.props.jobData["Location"]}</span>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </section>
    );
  }
}

export default LetterHead;
