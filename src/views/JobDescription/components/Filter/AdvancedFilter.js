import React, { Component } from "react";
import Search from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';
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

class  AdvancedFilter extends React.Component{


  render(){

    const {classes} = this.props;

  return (
  <div>
  <AppBar className={classes.appBar}>
    <Toolbar>
      <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
        <CloseIcon />
      </IconButton>
      <Button color="inherit" onClick={this.props.handleClose}>
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
  <Button style={styles.a} variant="outlined"  onClick={this.props.handleFilterSubmit}>
    Filter Resumes
  </Button>
  </div>
  )

  }
}



export default  withStyles(styles)(AdvancedFilter);
