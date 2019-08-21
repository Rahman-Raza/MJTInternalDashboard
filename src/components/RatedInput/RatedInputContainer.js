import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AutoComplete from "material-ui/AutoComplete";
import RatedInput from "./RatedInput";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const themeColor = "#00ADF3";

const styles = {
  root: {
    margin: "30px 0"
  },
  title: {
    color: themeColor,
    margin: "10px 0px",
  }
};
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: "#ffb81b",
    primary: "#009dd6",
  }
});

class RatedInputContainer extends Component {


  state = {
      dataSource:
        [],
      currentAddition: "",
      icon: this.props.icon,
    inputs: this.props.defaultValues.map(value => ({
      name: value,
    })),
    showInput: false
  };

   componentDidMount() {
    this.props.onRef(this);
    console.log("checking ratedinput container props for icon", this.props);
  }
  autoCompleteUpdateHandler = value => {
    this.setState({
      currentAddition: value
    });
  };

  addSkill = name => {
    this.setState({
      inputs: [...this.state.inputs, { name }]
    });
  };

  removeSkillHandler = name => {
    this.setState({
      inputs: this.state.inputs.filter(current => current.name !== name)
    });
  };

  returnInfo = () =>{

    var returnData = [];
   this.state.inputs.map((item, index) =>{
    returnData.push(item["name"]);
   })

   console.log("checking returnData", returnData);

   return returnData;
  }

  render() {
    return (
      <article style={styles.root}>
        <Typography style={styles.title}>{this.props.label}</Typography>

        {this.state.inputs.map((current, index) => (
          <RatedInput
            name={current.name}
            icon={this.props.icon}
            key={index}
            removeHandler={this.removeSkillHandler}
          />
        ))}

        {this.state.showInput ? (
          <div>
           <MuiThemeProvider muiTheme={muiTheme}>
             <AutoComplete
              name="Add"
              dataSource={this.state.dataSource}
              onUpdateInput={this.autoCompleteUpdateHandler}
              maxSearchResults={10}
              onNewRequest={ () =>{ this.addSkill(this.state.currentAddition);} }
            />
            </MuiThemeProvider>

            <Button
              variant="outlined"
              onClick={() => {
                this.addSkill(this.state.currentAddition);
              }}
              style={{

                margin: "0px 10px",

              }}
            >
              Add
            </Button>
          </div>
        ) : (
          <Typography
            style={{ ...styles.title, cursor: "pointer" }}
            onClick={e => this.setState({ showInput: true })}
          >
            + Add {this.props.title}
          </Typography>
        )}
      </article>
    );
  }
}

export default RatedInputContainer;
