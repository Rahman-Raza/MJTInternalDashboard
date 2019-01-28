import React from 'react';

import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

const styles = {
  root: {
    margin: '20px 0',
  },
  company: {
    color: grey[600],
  },
  role: {
    fontWeight: 700,
  },
};

class ResumeEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
   
     
    }

    console.log("checking ResumeEntry for Work experience", this.props.data);
  }
  render() {
    return (
      <article style={styles.root}>
        <Typography gutterBottom>{this.props.data["startDateString"] } to {this.props.data["endDateString"]}</Typography>

        <Typography style={styles.company} gutterBottom>
          {this.props.data["companyName"] + ', Location City, State'}
        </Typography>
        <Typography style={styles.role} gutterBottom>
         {this.props.data["title"]}
        </Typography>
        <Typography gutterBottom>
         {this.props.data["comments"]}
        </Typography>
      </article>
    );
  }
}

export default ResumeEntry;
