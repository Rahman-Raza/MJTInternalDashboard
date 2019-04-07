import React, { Component } from "react";
import CandidateCard from "./CandidateCard";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';
import CustomizedInputBase from './CustomizedInputBase';
const styles = {
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
  }
};

class MatchingRateList extends React.Component{

state={
  filter: "",
}


handleFilter = (newFilter ) =>{

  console.log("got to handleFilter");
  this.setState(() => ({
    filter: newFilter
  }));
};

render(){
//  const list = this.state.options.filter(option => option.Name.toLowerCase().includes(this.state.filter.toLowerCase))

const list = this.props.data.filter(option => option.Name.toLowerCase().includes(this.state.filter.toLowerCase()));
//const list = this.props.data;

  return (
    <aside style={styles.sidebar} className="sidebar">
      <div style={styles.sideBarContainer}>
        <h3 style={styles.sidebarHeading}>Top Candidates</h3>
        <Filter handleFilter={this.handleFilter}/>
        {
          list.length > 0 ?
        (

         list.map((current, index) => {
            return (
               <CandidateCard
                key={current.ID}
                resumeToggler={this.toggleResume}
                percentage={current["ResumeScore"]}
                data={current} /> )
          })

        )
        :
        ( <div style={{padding:"620px"}}> </div>)


        }
      </div>
    </aside>

  )
}
}

const Filter = (props) => (
  <div>
  <CustomizedInputBase handleFilter={props.handleFilter}/>
  
  </div>
);

export default MatchingRateList;
