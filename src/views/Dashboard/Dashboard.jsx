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

     super(props);
      this.state = {

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
  this.fetchData(this.state.positionStatus);
  console.log("checking constructor props in views/dashboard", props);
   console.log("running appRef.printTest");
   this.props.appRef.printTest("adcdeded");

 
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
       url = 'http://18.206.187.45:8080/jobpostingspagination?status='+this.state.positionStatus +'&'+ this.state.paginator[0]["next"].slice(1);
    }
    else if (pageNumber - this.state.activePage == -1){
       console.log("was in previous");
       console.log("checking in previous this.state.paginator[0]",this.state.paginator[0] );
       url = 'http://18.206.187.45:8080/jobpostingspagination?status='+this.state.positionStatus+'&' + this.state.paginator[0]["previous"].slice(1);
    }

    else {
      url = '';
    }

    this.reloadPageData(url);

    this.setState({activePage: pageNumber});
  }



  handlePagination = (response) =>{

    var page = this.state.paginator;

    page[0] = response;
   this.setState({paginator: page});
  }
  handleJobPostingsData = (response) =>{
    console.log("checking job postings items", response);
    this.setState({newOpenings: response});
  }
  componentDidMount = () =>{
    
     


  }

  fetchData = async (positionStatus) =>{

    var self=this;

    this.setState({loading: true, positionStatus: positionStatus});
    await axios.get('http://18.206.187.45:8080/jobpostingspagination?status='+positionStatus+'&limit=10&offset=0')
      
      .then(function (response) {
        console.log("heres the response from axios pagination call", response);
        
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


  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  changeNavPill = (index) =>{
    console.log("got to changeNavPill", index);

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
    history.push('/job-description',{jobID: opening["ID"]});

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
          <GridContainer dashGrid={true}>
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
                              {this.state.newOpenings.map((opening, index) => (
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
                                    statIcon={Email}
                                    statText="Updated 2 Min ago..."
                                  />
                                </ItemGrid>
                              ))}
                            </GridContainer>
                          </div>
                        )
                      },
                      {
                        tabButton: "Open Positions",
                        tabContent: (
                          <div>
                             <GridContainer>
                              {this.state.newOpenings.map((opening, index) => (
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
                                    statIcon={Email}
                                    statText="Updated 2 Min ago..."
                                  />
                                </ItemGrid>
                              ))}
                            </GridContainer>
                          </div>
                        )
                      },
                      {
                        tabButton: "Closed Positions",
                        tabContent: (
                          <div>
                              <GridContainer>
                              {this.state.newOpenings.map((opening, index) => (
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
                                    statIcon={Email}
                                    statText="Updated 2 Min ago..."
                                  />
                                </ItemGrid>
                              ))}
                            </GridContainer>
                          </div>
                        )
                      }
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