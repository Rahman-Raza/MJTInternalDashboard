import React, { Component } from "react";
import CandidateCard from "./CandidateCard";

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
  sidebarHeading: {
    color: "#FFF",
    display: "block",
    padding: "0 50px 25px 0",
    margin: "100px 0",
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
    }
  }
};

class MatchingRateList extends React.Component{
state = {
  options: this.props.data,
  filter: ""
}

handleFilter = (newFilter ) =>{
  this.setState(() => ({
    filter: newFilter
  }));
};

render(){
  const list = this.state.options.filter(option => option.Name.toLowerCase().includes(this.state.filter.toLowerCase))
  return (
    <aside style={styles.sidebar} className="sidebar">
      <h3 style={styles.sidebarHeading}>Top Candidates</h3>
      <Filter/>
      {
        this.state.options.length > 0 ?
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
    </aside>

  )
}
}

const Filter = (props) => (
  <div>
    <input name="filter" onChange={(e) => {
        props.handleFilter(e.target.value);
      }}/>
  </div>
);
