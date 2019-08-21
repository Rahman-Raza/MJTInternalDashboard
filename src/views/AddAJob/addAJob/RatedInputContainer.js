import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AutoComplete from "material-ui/AutoComplete";
import RatedInput from "./RatedInput";
import Skills from "../output.js";
import Languages from "../output2.js";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
const flattenedArraySkills = [].concat(...Skills.JSONData);
const flattenedArrayLanguages = [].concat(...Languages.JSONData);
const themeColor = "#00ADF3";

const styles = {
  root: {
    margin: "30px 0"
  },
  title: {
    color: themeColor
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
        this.props.dataType == "Skills"
          ? flattenedArraySkills
          : flattenedArrayLanguages,
      currentAddition: "",
    inputs: this.props.defaultValues.map(value => ({
      name: value
    })),
    showInput: false
  };

   componentDidMount() {
    this.props.onRef(this);
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
        <Typography style={styles.title}>{this.props.title}</Typography>

        {this.state.inputs.map((current, index) => (
          <RatedInput
            name={current.name}
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
            />
            </MuiThemeProvider>

            <Button
              variant="raised"
              onClick={() => {
                this.addSkill(this.state.currentAddition);
              }}
              style={{
                borderRadius: "25px",
                margin: "10px",
                maxHeight: "32px"
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
