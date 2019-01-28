import React, { Component } from "react";
import ReactDOM from "react-dom";

import Paper from "@material-ui/core/Paper";

import "./JobDescription.scss";

import Header from "./components/Header";
import Nav from "./components/Nav";
import Main from "./components/Main";

import bgImage from "assets/img/job-position-background.png";

const styles = {
    root: {
        background: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        paddingTop: "25px"
    },
    paper: {
        width: "75%",
        margin: "75px auto",
        padding: "50px 0 0 0"
    }
};

class JobDescription extends Component {

     constructor(props) {
    super(props);
    this.state = {
      loading:false,
      loadingMessage: 'Loading data...'
    };
}

    
    render() {
        return (
        <div>
            <div className="container">
            <Nav />
            </div>
            <div style={styles.root}>

                <Paper style={styles.paper}>

                    
                    <Main jobID={this.props.location.state.jobID}/>
               
                </Paper>
            </div>
        </div>
        );
    }
}

export default JobDescription;
