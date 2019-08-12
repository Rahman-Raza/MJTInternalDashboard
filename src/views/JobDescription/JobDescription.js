import React, { Component } from "react";
import ReactDOM from "react-dom";
import Paper from "@material-ui/core/Paper";
import Radium from 'radium';
import { withStyles } from '@material-ui/core/styles';

import "./JobDescription.scss";

import Header from "./components/Header";
import Nav from "./components/Nav";
import Main from "./components/Main";
import LoadingOverlay from 'react-loading-overlay';
import bgImage from "assets/img/job-position-background.png";

const styles =  theme => ({
    root: {
        background: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        paddingTop: "25px",
        [theme.breakpoints.down('sm')]: {
          background: "none",
          padding: "0px",
    },
    },
    paper: {
        width: "85%",
        margin: "75px auto",
        padding: "50px 0 0 0",
        [theme.breakpoints.down('sm')]: {
          width: "100%",
          padding: "10px 0 0 0",
          margin: "0px",
    },
    }
});

class JobDescription extends React.Component {

     constructor(props) {

        console.log("checking incoming cookies into JobDescription", props);
    super(props);
    this.state = {
      loading:false,
      loadingMessage: 'Loading data...'
    };
}


handleLoading = (loading, loadingMessage) =>{
    this.setState({loading: loading, loadingMessage: loadingMessage});
}


    render() {
      const { classes } = this.props;
        return (
        <div>
        <LoadingOverlay
                        active={this.state.loading}
                        spinner
                        text={this.state.loadingMessage}
                        classNamePrefix="MyLoader_"

                        >
            <div className="container">
            <Nav />
            </div>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Main loadingRef={this.handleLoading} jobID={this.props.location.state.jobID} cookies={this.props.cookies}  />
                </Paper>
            </div>
            </LoadingOverlay>
        </div>
        );
    }
}



export default withStyles(styles)(Radium(JobDescription));
