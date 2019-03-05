import Add from "@material-ui/icons/Add";
import AddLocation from "@material-ui/icons/AddLocation";
import Section from "components/Section/Section.jsx";
import Background from "assets/img/dashboard-bg.png";
import axios from "axios";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import AddJob from "components/AddJob/AddJob.jsx";
import IconCard from "components/Card/IconCard.jsx";
import RegularCard from "components/Card/RegularCard.jsx";
import StatsCard from "components/Card/StatsCard.jsx";
import IconButton from "components/CustomButtons/IconButton.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
// material-ui components
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import FaApple from "react-icons/lib/fa/apple";
import FaFacebookSquare from "react-icons/lib/fa/facebook-square";
import FaGooglePlusSquare from "react-icons/lib/fa/google-plus-square";
import FaLinkedinSquare from "react-icons/lib/fa/linkedin-square";
import FaSnapchatSquare from "react-icons/lib/fa/snapchat-square";
import FaTumblrSquare from "react-icons/lib/fa/tumblr-square";
import FaTwitch from "react-icons/lib/fa/twitch";
import FaTwitterSquare from "react-icons/lib/fa/twitter-square";

// local components
import LocalSearch from "./Search.js";
import Pagination from "react-js-pagination";
import LoadingOverlay from 'react-loading-overlay';
import history from 'index.js';
const us_flag = require("assets/img/flags/US.png");
const de_flag = require("assets/img/flags/DE.png");
const au_flag = require("assets/img/flags/AU.png");
const gb_flag = require("assets/img/flags/GB.png");
const ro_flag = require("assets/img/flags/RO.png");
const br_flag = require("assets/img/flags/BR.png");

const RegularMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
      defaultOptions={{
        scrollwheel: false
      }}
    >
      <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
    </GoogleMap>
  ))
);

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};

class Dashboard extends React.Component {

  constructor(props){
   var signal = axios.CancelToken.source();
   console.log("checking props in viws/Dashboard", props);

     super(props);
      this.state = {
        assignedOpenings: [],
        isMounted: false,
        signal: signal,
    paginator: [
    {
      limit: 10,
      next: "?limit=10&offset=0",
      offset: 0,
      total_count: 100,
      previous: null,

    }
    ],
    positionStatus: 'New',
    activePage: 1,
    loading: false,
    loadingMessage: 'Loading Data...',
    value: 0,
    alert: null,
    show: false,
    open: false,
    newOpenings: [
      {
        CompanyName: "Twitter",
        JobPosition: "Front End Software Engineer",
        Location: "San Francisco",
        icon: FaTwitterSquare
      },
      {
        CompanyName: "Tumblr",
        JobPosition: "Android Software Engineer",
        Location: "Santa Clara",
        icon: FaTumblrSquare
      },
      {
        CompanyName: "Twitch",
        JobPosition: "Backend Software Engineer",
        Location: "New York",
        icon: FaTwitch
      },
      {
        CompanyName: "Snapchat",
        JobPosition: "DevOps Software Engineer",
        Location: "Santa Monica",
        icon: FaSnapchatSquare
      },
      {
        CompanyName: "Google",
        JobPosition: "Machine Learning Engineer",
        Location: "San Francisco",
        icon: FaGooglePlusSquare
      },
      {
        CompanyName: "Apple",
        JobPosition: "IOS Software Engineer",
        Location: "Cupertino",
        icon: FaApple
      },
      {
        CompanyName: "Facebook",
        JobPosition: "Backend Software Engineer",
        Location: "Menlo Park",
        icon: FaFacebookSquare
      },
      {
        CompanyName: "LinkedIn",
        JobPosition: "Machine Learning Engineer",
        Location: "San Francisco",
        icon: FaLinkedinSquare
      }
    ],
    closed: [],
    openings: [
      {
        CompanyName: "Google",
        JobPosition: "Machine Learning Engineer",
        Location: "San Francisco",
        icon: FaGooglePlusSquare
      },
      {
        CompanyName: "Apple",
        JobPosition: "IOS Software Engineer",
        Location: "Cupertino",
        icon: FaApple
      },
      {
        CompanyName: "Facebook",
        JobPosition: "Backend Software Engineer",
        Location: "Menlo Park",
        icon: FaFacebookSquare
      },
      {
        CompanyName: "LinkedIn",
        JobPosition: "Machine Learning Engineer",
        Location: "San Francisco",
        icon: FaLinkedinSquare
      }
    ]
  }
 
 
  }
 

  reloadPageData = (url) =>{
var self = this;

this.setState({loading: true});
    axios.get(url)
      
      .then(function (response) {
        console.log("heres the response from axios pagination call in reload data", response);
        
        if(response["status"]  == 200){
          self.handlePagination(response.data["Data"]["paginator"]);
          self.handleJobPostingsData(response.data["Data"]["items"]);
          self.setState({loading: false});

        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  

  handlePageChange = (pageNumber) =>  {
    console.log(`active page is ${pageNumber}`);

    var url = '';
    
    if(pageNumber - this.state.activePage == 1){
      console.log("was in next");
       url = 'https://mjtbe.tk/jobpostingspagination?status='+this.state.positionStatus +'&'+ this.state.paginator[0]["next"].slice(1);
    }
    else if (pageNumber - this.state.activePage == -1){
       console.log("was in previous");
       console.log("checking in previous this.state.paginator[0]",this.state.paginator[0] );
       url = 'https://mjtbe.tk/jobpostingspagination?status='+this.state.positionStatus+'&' + this.state.paginator[0]["previous"].slice(1);
    }

    else {
      url = '';
    }

    this.reloadPageData(url);

    this.setState({activePage: pageNumber});
  }



  handlePagination = async (response) =>{

    var page = this.state.paginator;

    page[0] = response;
   this.setState({paginator: page});
  }
  handleJobPostingsData = (response) =>{
    console.log("checking job postings items", response);
    this.setState({newOpenings: response});
  }

  handleAssignedJobPostingsData = (data) =>{

     
     console.log("checking job postings items", data);

     let assignedOpenings = [];

     for (let value of Object.values(data)){
        if (value.length > 0){
          for (var i = 0; i < value.length; i++){
            assignedOpenings.push(value[i]);
          }
        }
     }


   this.setState({assignedOpenings: assignedOpenings});

  }
  componentDidMount = () =>{
    
     this.setState({isMounted: true});
 this.fetchData(this.state.positionStatus);
  
  
   this.props.appRef.printTest("adcdeded");


  }

  fetchData = async (positionStatus) =>{

   
   try{ 

      var self=this;

      this.setState({loading: true, positionStatus: positionStatus});
       await axios.get('https://mjtbe.tk/jobpostingspagination?status='+positionStatus+'&limit=10&offset=0')
        
        .then(function (response) {
          console.log("heres the response from axios pagination call", response);
          
          if(response["status"]  == 200){

            if(self.state.isMounted){
            self.handlePagination(response.data["Data"]["paginator"]);
            self.handleJobPostingsData(response.data["Data"]["items"]);
            self.setState({loading: false});
          }
          }
        })
      }

    catch (err) {

      if (axios.isCancel(err)) {
        console.log('Error: ', err.message); // => prints: Api is being canceled
      } else {
        this.setState({ isLoading: false });
      }
  }

}

  fetchDataAssigned = async () =>{

   
   try{ 

      var self=this;

      this.setState({loading: true});
       await axios.get('https://mjtbe.tk/viewassignedjoborders')
        
        .then(function (response) {
          console.log("heres the response from axios viewassignedjoborders call", response);
          
          if(response["status"]  == 200){

            if(self.state.isMounted){


          
            self.handleAssignedJobPostingsData(response.data["Data"]);
            self.setState({loading: false});
            // self.setState({loading: false});
          }
          }
        })
      }

    catch (err) {

      if (axios.isCancel(err)) {
        console.log('Error: ', err.message); // => prints: Api is being canceled
      } else {
        this.setState({ isLoading: false });
      }
  }

}


  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  changeNavPill = (index) =>{
    //console.log("got to changeNavPill", index);

    switch(index){
      case 0:
        this.fetchData('New');
        break;
      case 1:
        this.fetchData('Open');
        break;
      case 2:
        this.fetchData('Closed');
        break;
      case 3:
        this.fetchDataAssigned('Assigned');
        break;
    }

  }
  inputAlert = () => {
    console.log("checking this.props.classes", this.props.classes);
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-250px" }}
          title="Input something"
          onConfirm={e => this.inputConfirmAlert(e)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.info
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
        >
          <AddJob />
        </SweetAlert>
      )
    });
  };
  inputConfirmAlert = e => {
    this.setState({ alert: e });
    setTimeout(this.inputConfirmAlertNext, 200);
  };
  inputConfirmAlertNext = () => {
    const inputValue = this.state.alert;
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.info
          }
          title={
            <p>
              You entered: <b>{inputValue}</b>
            </p>
          }/>
      )
    });
  };

  hideAlert = () => {
    this.setState({
      show: false
    });
  };

  openJobDescription = (opening) => {
    console.log("opened job number", opening);

    console.log("checking props.cookies in openJobDescription", this.props.cookies);
    history.push('/job-description',{jobID: opening["ID"]},);

  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLoadingClose = () =>{

    var self = this;
    setTimeout(
    function() {
        self.setState({loading: false, loadingMessage: 'Loading...'});
    }
    ,
    3000
);
  };

    componentWillUnmount = () => {
    this.state.signal.cancel('Api is being canceled');

     this.state.isMounted = false


  };

  time_ago = (time) => {

  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds == 0) {
    return 'Just now'
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  var i = 0,
    format;
  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
  return time;
}

  parseTime = (time) =>{
   // console.log("checking time ", time);
 
    let newTime = this.time_ago(new Date(time));

   // console.log("checking new time", newTime);
   


    return newTime;

  }
  

  render() {
    const { classes } = this.props;
    const { fullScreen } = this.props;
    const self = this;
    return (
      <div>
      <LoadingOverlay
        active={this.state.loading}
        spinner
        text={this.state.loadingMessage}
        classNamePrefix="MyLoader_"
        >
        <AddJob open={this.state.open} onClose={this.handleClose} />

        <Section
          containerSize={0}
          style={{
            background: "url(" + Background + ") repeat-x",
            backgroundSize: "fixed",
            paddingBottom: "5%",
            paddingTop: "25px",
            marginTop: "25px",
          }}
        >
          <GridContainer dashgrid="true">
            <ItemGrid xs={1} sm={1} />

            <ItemGrid xs={10} sm={10} style={{ marginTop: "50px" }}>
              <RegularCard
                cardTitle={<span>Job Positions</span>}
                
                subtitleAlign="right"
                content={
                <div>
                  <NavPills
                    color="warning"
                    loadingRef={self}
                    changeNavPill={this.changeNavPill}
                    tabs={[
                      {
                        tabButton: "New Positions",
                        tabContent: (
                          <div>
                            <GridContainer>
                              {this.state.newOpenings.map((opening, index) => 
                                {
                                  let updatedAt = opening.UpdatedAt ? this.parseTime(opening.UpdatedAt) : "0 min ago";
                                  
                                  return(
                                          <ItemGrid xs={12} sm={6} md={3} key={index}>
                                            <StatsCard
                                            onClick={() => {
                                                this.openJobDescription(opening);
                                              }}
                                              icon={FaGooglePlusSquare}
                                              iconColor="orange"
                                              title={
                                                opening.CompanyName + " - " + opening.Location
                                              }
                                              description={opening.JobPosition}
                                              small="Tech"
                                              category="New"
                                              statIcon={Email}
                                              statText={"Updated " + updatedAt}
                                            />
                                          </ItemGrid>
                                         )})}
                            </GridContainer>
                          </div>
                        )
                      },
                      {
                        tabButton: "Open Positions",
                        tabContent: (
                          <div>
                             <GridContainer>
                              {this.state.newOpenings.map((opening, index) => {
                               let updatedAt = opening.UpdatedAt ? this.parseTime(opening.UpdatedAt) : "0 min ago";
                                return (
                                <ItemGrid xs={12} sm={6} md={3} key={index}>
                                  <StatsCard
                                   onClick={() => {
                                      this.openJobDescription(opening);
                                    }}
                                    icon={FaGooglePlusSquare}
                                    iconColor="orange"
                                    title={
                                      opening.CompanyName + " - " + opening.Location
                                    }
                                    description={opening.JobPosition}
                                    small="Tech"
                                    category="Open"
                                    statIcon={Email}
                                    statText={"Updated " + updatedAt}
                                  />
                                </ItemGrid>
                              )})}
                            </GridContainer>
                          </div>
                        )
                      },
                      {
                        tabButton: "Closed Positions",
                        tabContent: (
                          <div>
                              <GridContainer>
                              {this.state.newOpenings.map((opening, index) => {
                                let updatedAt = opening.UpdatedAt ? this.parseTime(opening.UpdatedAt) : "0 min ago";
                                return(
                                <ItemGrid xs={12} sm={6} md={3} key={index}>
                                  <StatsCard
                                    onClick={() => {
                                      this.openJobDescription(opening);
                                    }}
                                    icon={FaGooglePlusSquare}
                                    iconColor="orange"
                                    title={
                                      opening.CompanyName + " - " + opening.Location
                                    }
                                    category="Closed"
                                    description={opening.JobPosition}
                                    small="Tech"
                                    statIcon={Email}
                                    statText={"Updated " + updatedAt}
                                  />
                                </ItemGrid>
                              )})}
                            </GridContainer>
                          </div>
                        )
                      },

                      this.props.cookies.get('Role') == 'User' ? 
                      ({
                        tabButton: "Assigned Positions",
                        tabContent: (
                          <div>
                              <GridContainer>
                              {this.state.assignedOpenings.map((opening, index) => {
                                let updatedAt = opening.UpdatedAt ? this.parseTime(opening.UpdatedAt) : "0 min ago";
                                return(
                                <ItemGrid xs={12} sm={6} md={3} key={index}>
                                  <StatsCard
                                    onClick={() => {
                                      this.openJobDescription(opening);
                                    }}
                                    category="Assigned"
                                    icon={FaGooglePlusSquare}
                                    iconColor="orange"
                                    title={
                                      opening.CompanyName + " - " + opening.Location
                                    }
                                    description={opening.JobPosition}
                                    small="Tech"
                                    statIcon={Email}
                                    statText="Updated 2 Min ago..."
                                    statText={"Updated " + updatedAt}
                                  />
                                </ItemGrid>
                              )})}
                            </GridContainer>
                          </div>
                        )
                      }) : {}
                    ]}
                  />


           
        </div>
                }
              />
            </ItemGrid>
               <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.state.paginator[0]['total_count']}
          pageRangeDisplayed={2}
          onChange={this.handlePageChange}
          innerClass=" pagination__list pagination pagination_type2"
          itemClass="pagination__group"
          linkClass="pagination__item"
          linkClassPrev="pagination__control_prev"
          linkClassNext="pagination__control_next"
          activeClass="pagination__group"
          activeLinkClass="pagination__item pagination__item_active"
          itemClassNext="pagination__group"
          itemClassPrev="pagination__group"
          hideFirstLastPages={true}

          
          
        />
        
          </GridContainer>
        </Section>

        </LoadingOverlay>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);