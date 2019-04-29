import React, { Component } from "react";
import CandidateCard from "./CandidateCard";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';
import MatchingRateListFilter from './MatchingRateListFilter';
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
  sidebar: {
    background: "#00ADF3",
    padding: " 1px 50px",
    position: "relative",
    top: "-50px",
    minHeight: "101.9%",
    width: "103%",

  },
  sideBarContainer: {
    margin: "100px 0px",
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
 handleFilterSubmit = () =>{
   console.log("got to handlefulter submit");
 }

render(){
//  const list = this.state.options.filter(option => option.Name.toLowerCase().includes(this.state.filter.toLowerCase))
const { classes } = this.props;
const list = this.handleSort(this.props.data.filter(option => option.Name.toLowerCase().includes(this.state.filter.toLowerCase())));
//const list = this.props.data;

  return (
<div>
  <Dialog
              fullScreen
              open={this.state.dialogOpen}
              onClose={this.handleClose}
            >
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                    <CloseIcon />
                  </IconButton>
                  <Button color="inherit" onClick={this.handleClose}>
                    filter
                  </Button>
                </Toolbar>
              </AppBar>
              <Grid container className={classes.gridRoot} spacing={32}>
                <Grid item >
                      <List>
                      <ListItem>
                      <div className="col-md-12" style={{margin: "5px 0px"}}>
                        <p style={{color:"#00ADF3"}}>Work</p>
                      </div>
                      </ListItem>
                        <ListItem>

                        <div className="col-md-12" style={{margin: "0px 0px"}}>
                        <TextField
                            id="outlined-search"
                            label="Job Title"
                            type="search"
                            margin="normal"
                            variant="outlined"
                          />
                        </div>
                        </ListItem>
                        <ListItem>
                        <div className="col-md-12" style={{margin: "0px 0px"}}>
                        <TextField
                            id="outlined-search"
                            label="Company Name"
                            type="search"
                            margin="normal"
                            variant="outlined"
                          />
                        </div>
                        </ListItem>
                        <ListItem>
                        <div className="col-md-12" style={{margin: "0px 0px"}}>
                        <TextField
                            id="outlined-search"
                            label="Minimum work length"
                            type="search"
                            margin="normal"
                            variant="outlined"
                          />
                        </div>
                        </ListItem>
                        <ListItem>
                        <div className="col-md-12" style={{margin: "0px 0px"}}>
                          <TextField
                              id="outlined-search"
                              label="Job Description"

                              margin="normal"
                              variant="outlined"
                              multiline={true}
                              rows={4}
                            />
                        </div>
                          </ListItem>

                      </List>
                    </Grid>
                    <Grid item>
                    <div className="row">
                      <List>
                        <ListItem>
                        <div className="col-md-12" style={{margin: "5px 0px"}}>
                          <p style={{color:"#00ADF3"}}>School</p>
                        </div>
                        </ListItem>
                        <ListItem>
                          <div className="col-md-12" style={{margin: "0px 0px"}}>
                          <TextField
                              id="outlined-search"
                              label="Degree Type"
                              type="search"
                              margin="normal"
                              variant="outlined"
                            />
                          </div>
                      </ListItem>
                      <ListItem>
                        <div className="col-md-12" style={{margin: "0px 0px"}}>
                        <TextField
                            id="outlined-search"
                            label="Major"
                            type="search"
                            margin="normal"
                            variant="outlined"
                          />
                        </div>
                    </ListItem>
                    <ListItem>
                      <div className="col-md-12" style={{margin: "0px 0px"}}>
                      <TextField
                          id="outlined-search"
                          label="Univeristy"
                          type="search"
                          margin="normal"
                          variant="outlined"
                        />
                      </div>
                  </ListItem>
                  <ListItem>
                  <div className="col-md-12" style={{margin: "0px 0px"}}>
                    <TextField
                        id="outlined-search"
                        label="School Description"

                        margin="normal"
                        variant="outlined"
                        multiline={true}
                        rows={4}
                      />
                  </div>
                    </ListItem>
                </List>
              </div>
                </Grid>
                <Grid item >
                <div className="row">
                <List>
                <ListItem>
                <div className="col-md-12" style={{margin: "5px 0px"}}>
                  <p style={{color:"#00ADF3"}}>Skills</p>
                </div>
                </ListItem>
                <ListItem>
                  <div className="col-md-12" style={{margin: "5px 0px"}}>
                <RatedInputContainer
                           onRef={(ref) => {this.SkillsContainer = ref}}
                              title="Skills"
                              icon={<Layers/>}
                              dataType="Languages"
                              defaultValues={[]}
                          />
                </div>
                </ListItem>
                </List>
                </div>
                </Grid>
              </Grid>
              <Button style={styles.a} variant="outlined"  onClick={this.handleFilterSubmit}>
                Filter Resumes
             </Button>

    </Dialog>
    <aside style={styles.sidebar} className="sidebar">
      <div style={styles.sideBarContainer}>
        <h3 style={styles.sidebarHeading}>Top Candidates</h3>
      <MatchingRateListFilter advancedFilter={this.handleClickOpen} sortAscending={this.sortAscending} handleFilter={this.handleFilter}/>
        {
          list.length > 0 ?
        (

         list.map((current, index) => {
            return (
               <CandidateCard
                key={current.ID}
                resumeToggler={this.props.toggleResume}
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


export default withStyles(styles)(MatchingRateList);
