import React, { Component } from "react";
import Radium from 'radium';
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import CandidateCard from "./CandidateCard";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';
import MatchingRateListFilter from './Filter/MatchingRateListFilter';
import AdvancedFilter from './Filter/AdvancedFilter';
import ExpansionPanel from './Filter/ExpansionPanel';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import RatedInputContainer from 'components/RatedInput/RatedInputContainer.js';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import Work from '@material-ui/icons/Work';
import LocationCity from '@material-ui/icons/LocationCity';
import School from '@material-ui/icons/School';
import Layers from '@material-ui/icons/Layers';
import Grid from '@material-ui/core/Grid';

const themeColor = "#00ADF3";
const styles = {
  gridRoot:{
    flexGrow: 1,
  },
  appBar: {
   position: "relative",
   background: "#00ADF3",
 },
 flex: {
   flex: 1,
 },
  paper: {
    padding: "20px"
  },
  filterSideBar:{
    padding: " 55px 0px",
    position: "relative",
    top: "-50px",
    minHeight: "101.9%",
  },
  sidebar: {
    background: "#00ADF3",
    padding: " 1px 50px",
    position: "relative",
    top: "-50px",
    minHeight: "101.9%",
    width: "114%",
    // '@media screen and (max-width: 400px)': {
    //   width: "50%",
    //   padding: " 1px 20px",
    // },
  },
  sideBarContainer: {
    margin: "50px 0px",
  },

  sidebarHeading: {
    color: "#FFF",
    display: "block",
    padding: "0 50px 25px 0",

    borderBottom: "1px solid #FFF"
  },
  responsibility: {
    list: {
      fontSize: "20px",
      color:'#666666'
    },
    listItem: {
      fontSize: "20px",
      margin: "5px 0",
      color:'#666666',
    },
    filter:{

    },
    textLabel: {
        color: "#00ADF3",
        fontFamily: "Roboto",
        fontWeight: "400"
    },
    a: {
      padding: "10px 0px",
      color: "#00ADF3",
      fontSize: "14px",
      textDecoration: "none",

    },
  }
};

class MatchingRateList extends React.Component{

state={
  dialogOpen: false,
  filter: "",
  sortAscending: true,
  twilioOpen: false,
  twilioDialog: " ",
}




handleFilter = (newFilter ) =>{

  console.log("got to handleFilter");
  this.setState(() => ({
    filter: newFilter
  }));
};

sortAscending = () =>{

this.setState({sortAscending: !this.state.sortAscending});
};

handleSort = (data) =>{
 if(this.state.sortAscending == true){

   return data.sort((a,b) => a.Name.localeCompare(b.Name))
 }
 else{
   return data.sort((a,b) => a.Name.localeCompare(b.Name)).reverse()
 }
}

handleClickOpen = () => {
   this.setState({ dialogOpen: true });
 };

 handleClose = () => {
   this.setState({ dialogOpen: false });
 };


 handleFilterSubmit = (filterObject) =>{

   this.props.handleFilterSubmit(filterObject);


 }
 handlePhoneToggle = (phone_message) => {


  this.state.twilioOpen === false ? this.setState({twilioOpen: true, twilioDialog: phone_message }) : this.setState({twilioDialog: phone_message});


}


handlePhoneDialogClose = () =>{
  this.setState({twilioOpen: false});
}

render(){
//  const list = this.state.options.filter(option => option.Name.toLowerCase().includes(this.state.filter.toLowerCase))
const { classes } = this.props;
const list = this.handleSort(this.props.data.filter(option => option.Name.toLowerCase().includes(this.state.filter.toLowerCase())));
//const list = this.props.data;
let score = 100;
  return (
<div>
  <Dialog
              fullScreen
              open={this.state.dialogOpen}
              onClose={this.handleClose}
            >
            <AdvancedFilter handleClose={this.handleClose} handleFilterSubmit={this.handleFilterSubmit}/>

    </Dialog>
     {this.state.twilioOpen == true &&
        <SweetAlert success title={this.state.twilioDialog}  onConfirm={this.handlePhoneDialogClose} />
     }
      <aside style={styles.filterSideBar} className="sidebar">
      <ExpansionPanel handleClose={this.handleClose} handleFilterSubmit={this.handleFilterSubmit} />
      </aside>
    <aside style={styles.sidebar} className="sidebar">
      <div style={styles.sideBarContainer}>
        <h3 style={styles.sidebarHeading}>最优候选人序列</h3>
      <MatchingRateListFilter advancedFilter={this.handleClickOpen} sortAscending={this.sortAscending} handleFilter={this.handleFilter}/>
        {

          list.length > 0 ?
        (

         list.map((current, index) => {
          score = score -10;
            return (
               <CandidateCard
                key={current.ID}
                resumeToggler={this.props.toggleResume}
                handlePhoneToggle={this.handlePhoneToggle}
                percentage={current["ResumeScore"]}
                data={current} /> )
          })

        )
        :
        ( <div style={{padding:"620px"}}> </div>)


        }
      </div>
    </aside>
  </div>

  )
}
}


export default withStyles(styles)(Radium(MatchingRateList));
