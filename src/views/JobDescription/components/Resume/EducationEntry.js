import React from "react";

import Typography from "@material-ui/core/Typography";

const styles = {
    root: {
        marginBottom: "20px"
    },
    text: {
        color: "#FFF"
    }
};

class EducationEntry extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
       
         
        }
    }

    render(){

        return(

        <article style={styles.root}>
            <Typography variant="body2" style={styles.text} gutterBottom>
               {this.props.data["school"]}
            </Typography>

            <Typography style={styles.text} gutterBottom>
                {this.props.data["degree"] + ', ' +this.props.data["major"] }
            </Typography>

            <Typography style={styles.text} gutterBottom>
                {'Graduation: ' + this.props.data["gradDateString"]}
            </Typography>
        </article>
    );
    }
}

export default EducationEntry;
