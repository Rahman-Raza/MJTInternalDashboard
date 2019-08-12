import React from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
// import useMediaQuery from '@material-ui/core/useMediaQuery';

// @material-ui/icons
import Add from "@material-ui/icons/Add";
import CloudUpload from "@material-ui/icons/CloudUpload";
import FilterList from "@material-ui/icons/FilterList";
import history from 'index.js';
import FilterForm from 'components/FilterForm/FilterForm.jsx'
// custom

import AddAJob from "views/AddAJob/AddAJob.jsx";

const styles = {
    root: {},
    addIconStyle: {
        border: "1px solid #00ADF3",
        color: "#00ADF3",
        cursor: "pointer",
        fontSize: 30,
        position: "absolute",
        right: "90px",
        top: "10px"
    },
    addIconStyleMobile:{
      border: "1px solid #00ADF3",
      color: "#00ADF3",
      cursor: "pointer",
      fontSize: 30,
    },
    menuItemStyle: {
        color: "#00ADF3"
    },
    menuItemIconStyle: {
        color: "#00ADF3",
        margin: "5px"
    }
};

class FilterJobs extends React.Component {
   mobileview = false;
    state = {
        anchorEl: null,
        open: false
    };
    handleClick = event => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <Dialog  onClose={this.handleClose} open={this.state.open}>
                    <FilterForm closeRef={this.handleClose} filterJobs={this.props.filterJobs}/>
                </Dialog>
                <FilterList
                    classes={{
                        root: this.mobileview ? classes.addIconStyleMobile : classes.addIconStyle
                    }}
                    onClick={this.handleClick}
                />
            </div>
        );
    }
}

export default withStyles(styles)(FilterJobs);
