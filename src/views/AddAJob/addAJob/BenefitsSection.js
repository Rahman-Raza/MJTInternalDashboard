import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";

const themeColor = "#00ADF3";

const styles = {
    checkboxContainer: {
        border: `1px solid ${themeColor}`,
        borderRadius: "25px",
        color: themeColor,
        display: "inline-block",
        fontFamily: "Roboto",
        fontWeight: "400",
        borderRadius: "25px",
        margin: "10px",
        padding: "0 20px 0 5px",

        iconStyle: {
            color: themeColor
        }
    },
    closeIconStyle: {
        cursor: "pointer",
        position: "relative",
        top: "8px",
        left: "10px"
    }
};

class BenefitsSection extends React.Component {
    constructor(props) {
        super(props);

        let formData = {};

        props.inputs.forEach((item) => {
            formData[item.name] = item.checked;
        })

        this.state = {
            inputs: props.inputs,
             formData: formData,
        }
    }

    componentDidMount() {
    this.props.onRef(this);
  }

    removeChip(chip) {
        this.setState({
            inputs: this.state.inputs.filter(current => current !== chip)
        });
    }

    handleChange = (event,checked) => {
    var formData = this.state.formData;

    console.log("checking checkbox", event.target.name, event.target.checked);

    formData[event.target.name] = !formData[event.target.name];

    this.setState({ formData });
  }

  returnInfo() {
    return this.state.formData;
  }

    render() {

        const {formData} = this.state;
        return (
            <section>
                {this.state.inputs.map((current, index) => (
                    <article key={index} style={styles.checkboxContainer}>
                        <Checkbox
                            id={current.name}
                            checked={formData[current.name]}
                            name={current.name}
                            onChange={this.handleChange}
                            checkedIcon={
                                <Icon
                                    style={styles.checkboxContainer.iconStyle}
                                >
                                    done
                                </Icon>
                            }
                        />{" "}
                        {current.label}
                       
                    </article>
                ))}
            </section>
        );
    }
}

export default BenefitsSection;
