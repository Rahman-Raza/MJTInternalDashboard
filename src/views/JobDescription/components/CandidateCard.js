import React from "react";
import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import CircularProgressbar from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

const styles = {
  wordWrap: {

    wordWrap: "break-word",
  },
  card: {
    boxShadow: "0 0 16px 0 #eee",
    cursor: "pointer",
    marginBottom: "15px",
    backgroundColor: "linear-gradient(60deg, #ffa726, #fb8c00)"
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 20px"
  },
  percentageContainer: {
    alignItems: "center",
    color: "#00ADF3",
    display: "flex",
    fontFamily: "Helvetica",
    fontSize: "44px",
    fontWeight: 700,
    justifyContent: "flex-start",
    padding: "10px",
    width: "30%"
  },
  detailContainer: {
    color: "#00ADF3",
    display: "inline-block",
    fontFamily: "Helvetica",
    fontSize: "14px",
    width: "100%",
    padding: "21px"
  },
  icon: {
    position: "relative",
    margin: "0 5px"
  },
   emailIcon: {
    position: "relative",
    top: "5px",
    margin: "0 5px"
  },
  name: {
    color: "#00ADF3",
    textTransform: "uppercase",
    margin: "0 0 0 5px"
  },
};

class CandidateCard extends React.Component {

  makeTwilioPhoneCall = (event) =>{

    event.stopPropagation()
    console.log("got to client makeTwilioPhoneCall");

    const formData = this.props.data["Phone"];

    axios.post("/twilio", { formData }).then( res => {
      console.log("heres the response from server for twilio: ", res.data);
    });

  }


  render() {


    return (
      <Card
        onClick={(event) => {
          this.props.resumeToggler(this.props.data["ID"]);
        }}
        style={styles.card}
        key={this.props.key}
      >
        <CardContent style={styles.cardContent}>

          { this.props.percentage && <section style={styles.percentageContainer}>
            <CircularProgressbar
              percentage={this.props.percentage}
              text={`${this.props.percentage}%`}
              styles={{
                path: {
                  stroke: "#00ADF3"
                },
                text: {
                  fill: "#00ADF3"
                }
              }}
            />
          </section>}

          <section style={styles.detailContainer}>
                 
                  <Button style={styles.name} >
                    {this.props.data["Name"]}
                  </Button>
            
                  <Button style={styles.name} onClick={this.makeTwilioPhoneCall}>
                    <Icon style={styles.icon}>phone</Icon>
                    {this.props.data["Phone"]}
                  </Button>

                   <Button style={styles.name} onClick={(event) => event.stopPropagation()}>
                    <Icon style={styles.icon}>email</Icon>
                    {this.props.data["Email"]}
                  </Button>
              
        
          </section>
        </CardContent>
      </Card>
    );
  }
}

export default CandidateCard;
