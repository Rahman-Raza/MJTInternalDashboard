import React from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Add from "@material-ui/icons/Add";
import CloudUpload from "@material-ui/icons/CloudUpload";
import history from 'index.js';
// custom
import axios from 'axios';
import AddAJob from "views/AddAJob/AddAJob.jsx";

const styles = {
    root: {},
    addIconStyle: {
        border: "1px solid #00ADF3",
        color: "#00ADF3",
        cursor: "pointer",
        fontSize: 30,
        position: "absolute",
        right: "31px",
        top: "21px"
    },
    menuItemStyle: {
        color: "#00ADF3"
    },
    menuItemIconStyle: {
        color: "#00ADF3",
        margin: "5px"
    }
};

class JobMenu extends React.Component {
    state = {
        anchorEl: null,
        open: false
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    openDialog = open => {
        history.push('/add-job');
    };

onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);
   this.sendResume(file);


}

sendResume = (resume) =>{
    var form = new FormData();
    var self = this;
    form.append('resumefile', resume);
    console.log("checking file", resume);

    this.props.loadingRef.setState({loading: true, loadingMessage: 'Sending your resume file to our team...'});  //setting the state of dashboard to activate loading overlay
    axios ("http://myjobtank.com:8087/resumeupload",{
            method: 'post',
            data:  form,
            //headers: { "Content-Type": "application/json" }
    })
      
      .then(function (response) {
        console.log("heres the response from /resumeupload", response);
        
        if(response["status"]  == 200){
          console.log("sucessfull call to /resumeupload");
           self.props.loadingRef.setState({loadingMessage: 'Your resume was recieved by our team.  Someone will be in touch!'}); 

           self.handleClose();
           self.props.loadingRef.handleLoadingClose();

            }
      })
      .catch(function (error) {
        console.log('error in /resumeupload ', error);
         self.props.loadingRef.setState({ loadingMessage: 'There was an error sending your file...Please try again.'}); 
         self.props.loadingRef.handleLoadingClose();
      });
}
    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;

        return (
            <div>
             <input id="myInput" type="file" style={{visibility: 'hidden'}} ref={(ref) => this.upload = ref}  onChange={this.onChangeFile}/>
                <Dialog fullScreen open={this.state.open}>
                    <AddAJob closeHandler={e => this.openDialog(false)} />
                </Dialog>
                <Add
                    classes={{
                        root: classes.addIconStyle
                    }}
                    aria-owns={anchorEl ? "simple-menu" : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                />
                <Menu
                    id="job-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem
                        onClick={e => this.openDialog(true)}
                        classes={{ root: classes.menuItemStyle }}
                    >
                        <Add classes={{ root: classes.menuItemIconStyle }} />{" "}
                        Add A Job Description
                    </MenuItem>
                    <MenuItem classes={{ root: classes.menuItemStyle }} onClick={(e) => this.upload.click() }>
                        <CloudUpload
                            classes={{ root: classes.menuItemIconStyle }}
                        />{" "}
                        Upload A Resume
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(JobMenu);
