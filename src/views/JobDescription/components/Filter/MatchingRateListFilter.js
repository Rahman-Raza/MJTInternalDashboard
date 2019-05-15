import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: '25px 0px',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

function MatchingRateListFilter(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase className={classes.input} placeholder="Filter by Name"
        onChange={(e) => {props.handleFilter(e.target.value)}} />
      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} />
      <IconButton color="primary" onClick={props.sortAscending} className={classes.iconButton} aria-label="Directions">
        <SortByAlphaIcon />
      </IconButton>
    </Paper>
  );
}

MatchingRateListFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MatchingRateListFilter);
