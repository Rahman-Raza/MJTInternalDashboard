import React from "react";

import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";

import CloudUpload from "@material-ui/icons/CloudUpload";
import LocationOn from "@material-ui/icons/LocationOn";

import RegularCard from "components/Card/RegularCard.jsx";
import Divider from "@material-ui/core/Divider";
import ArrowBack from "@material-ui/icons/ArrowBack";

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import Chip from '@material-ui/core/Chip';
const chipData = [{ key: 0, label: 'Jimmy' },
      { key: 1, label: 'John' },
      { key: 2, label: 'Jane' },
      { key: 3, label: 'Jack' },
      { key: 4, label: 'James' },];

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
   chipData: [
     { key: 0, label: 'Jimmy' },
           { key: 1, label: 'John' },
           { key: 2, label: 'Jane' },
           { key: 3, label: 'Jack' },
   ],
 };
 handleDelete = data => () => {
     if (data.label === 'React') {
       alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
       return;
     }

     this.setState(state => {
       const chipData = [...state.chipData];
       const chipToDelete = chipData.indexOf(data);
       chipData.splice(chipToDelete, 1);
       return { chipData };
     });
   };

  render() {
    return (
      <section style={styles.letterhead}>
       <Grid container>

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
                <LocationOn style={{ position: "relative", top: "-2px",color:'rgb(0, 173, 243)' }} />
                <span>{this.props.jobData["Location"]}</span>
              </Typography>

             {  this.props.cookieRole == 'Admin' ?

             (
              <div>
              <div className="row" style={{margin: "25px 0px"}}>
             {
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
    );
  }
}

export default LetterHead;
