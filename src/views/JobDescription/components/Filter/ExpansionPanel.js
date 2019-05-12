import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import AdvancedFilter from './AdvancedFilter';

import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlaylistPlay from '@material-ui/icons/PlaylistPlay';
import Menu from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    width: '100%',
    boxShadow: 'none',
  },
  paper:{
    boxShadow: 'none',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#00ADF3",


  },
});
class SimpleExpansionPanel extends React.Component{
  state={
    expanded: false,

  }

  handleExpand = (event, expanded) =>{
    this.setState({expanded: expanded});
  }

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };



  render(){
    const {classes} = this.props;
    const {expanded} = this.state;
    let expandIconStyle = expanded === true ? {transform: 'rotate(180deg) scaleX(-1)', color: "#00ADF3", } : {margin: '0px',color: "#00ADF3",};
    return(
      <div className={classes.root}>
        <ExpansionPanel onChange={this.handleExpand} expanded={expanded} elevation={0} classes={{}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <PlaylistPlay style={expandIconStyle}/>
            <Typography className={classes.heading}>Filter by Work / School / Skills</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <AdvancedFilter handleClose={this.handleExpand} handleFilterSubmit={this.props.handleFilterSubmit}/>
          </ExpansionPanelDetails>
        </ExpansionPanel>

      </div>
    )
  }
}


SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
