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
import isEqual from 'variables/isEqual';
const themeColor = "#00ADF3";
const styles = {
  filterContainer:{
    maxWidth: "300px",
  },
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
    filterButton: {
      padding: "10px 0px",
      color: "#00ADF3",
      fontSize: "14px",
      textDecoration: "none",

    },
  }
};

class  AdvancedFilter extends React.Component{
  state={
    formData:{
      DataSource: 1,
      Skills: [],
      SkillsInclusive: true,
      Employer: "",
      Title: "",
      WorkLengthMin: 0,
      JobDescription: "",
      Institution: "",
      Major: "",
      DegreeType: "",
    },
    formDataTemplate:{
      DataSource: 1,
      Skills: [],
      SkillsInclusive: true,
      Employer: "",
      Title: "",
      WorkLengthMin: 0,
      JobDescription: "",
      Institution: "",
      Major: "",
      DegreeType: "",
    }
  }

  handleChange = (event) =>{

      var originalForm = this.state.formData;

      originalForm[event.target.name] = event.target.value;
      this.setState({formData: originalForm});


  }
handleFilterSubmit = () =>{

  console.log("got to handleFilterSubmit");



  let submitForm = this.state.formData;
  let {formDataTemplate} = this.state;

  submitForm["Skills"] = this.SkillsContainer.returnInfo();
  submitForm["WorkLengthMin"] = parseInt(this.state.formData["WorkLengthMin"]);

  console.log("checking advanced filter data before submission", submitForm);


  if (JSON.stringify(submitForm) === JSON.stringify(formDataTemplate)){

    console.log("submitForm is empty object");
    this.props.handleFilterSubmit({});
  }
  else{
    this.props.handleFilterSubmit( submitForm);
  }
}
  render(){
    const {formData} = this.state;
    const {classes} = this.props;

  return (
  <div style={styles.filterContainer}>
  <Grid container className={classes.gridRoot} spacing={16}>
    <Grid item >
          <List>
            <ListItem>
            <div className="row">
            <div className="col-md-12" style={{margin: "5px 0px"}}>
              <p style={{color:"#00ADF3"}}>Work</p>
            </div>
            <div className="col-md-12" style={{margin: "0px 0px"}}>
            <TextField
                onChange={this.handleChange}
                name="Title"
                id="outlined-search"
                label="Job Title"
                type="search"
                margin="normal"
                variant="outlined"
              />
            </div>

            <div className="col-md-12" style={{margin: "0px 0px"}}>
            <TextField
                id="outlined-search"
                onChange={this.handleChange}
                value={formData["Employer"]}
                name="Employer"
                label="公司名称"
                type="search"
                margin="normal"
                variant="outlined"
              />
            </div>

            <div className="col-md-12" style={{margin: "0px 0px"}}>
            <TextField
                onChange={this.handleChange}
                id="outlined-search"
                label="最短工龄"
                value={formData["WorkLengthMin"]}
                name="WorkLengthMin"
                type="search"
                margin="normal"
                variant="outlined"
              />
            </div>

            <div className="col-md-12" style={{margin: "0px 0px"}}>
              <TextField
                  id="outlined-search"
                  onChange={this.handleChange}
                  label="职位简介"
                  value={formData["JobDescription"]}
                  name="JobDescription"
                  margin="normal"
                  variant="outlined"
                  multiline={true}
                  rows={4}
                />
            </div>
              </div>
            </ListItem>
          </List>

        <div className="row">
          <List>
            <ListItem>
            <div className="row">
              <div className="col-md-12" style={{margin: "5px 0px"}}>
                <p style={{color:"#00ADF3"}}>学校</p>
              </div>

                <div className="col-md-12" style={{margin: "0px 0px"}}>
                <TextField
                    id="outlined-search"
                    onChange={this.handleChange}
                    value={formData["DegreeType"]}
                    name="DegreeType"
                    label="文凭种类"
                    type="search"
                    margin="normal"
                    variant="outlined"
                  />
                </div>

              <div className="col-md-12" style={{margin: "0px 0px"}}>
              <TextField
                  id="outlined-search"
                  onChange={this.handleChange}
                  label="专业"
                  value={formData["Major"]}
                  name="Major"
                  type="search"
                  margin="normal"
                  variant="outlined"
                />
              </div>
            <div className="col-md-12" style={{margin: "0px 0px"}}>
            <TextField
                id="outlined-search"
                onChange={this.handleChange}
                value={formData["Institution"]}
                name="Institution"
                label="大学"
                type="search"
                margin="normal"
                variant="outlined"
              />
            </div>
        <div className="col-md-12" style={{margin: "0px 0px"}}>
          <TextField
              id="outlined-search"
              onChange={this.handleChange}
              label="学校简介"

              margin="normal"
              variant="outlined"
              multiline={true}
              rows={4}
            />
        </div>
      </div>
        </ListItem>
    </List>
  </div>

    <div className="row" style={{minWidth: "100px"}}>
    <List>
    <ListItem>
    <div className="row" style={{minWidth: "100px"}}>
        <div className="col-md-12" style={{margin: "5px 10px"}}>
          <p style={{color:"#00ADF3"}}>Skills</p>
        </div>

        <div className="col-md-12" style={{margin: "5px 10px"}}>
          <RatedInputContainer
                 onRef={(ref) => {this.SkillsContainer = ref}}
                    title="技能"
                    icon={<Layers/>}
                    dataType="Languages"
                    defaultValues={[]}
                />
      </div>
    </div>
    </ListItem>
    </List>
    </div>
    </Grid>
  </Grid>
  <div className="row" style={{marginTop: "10px"}} >
    <div className="col-lg-2"></div>
    <div className="col-lg-10">
    <Button style={styles.filterButton} variant="outlined"  onClick={this.handleFilterSubmit}>
      Filter Resumes
    </Button>
    </div>
  </div>
  </div>
  )

  }
}



export default  withStyles(styles)(AdvancedFilter);
