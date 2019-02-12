import React from "react";
import PropTypes from "prop-types";

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";

import statsCardStyle from "assets/jss/material-dashboard-pro-react/components/statsCardStyle";

function switchCategory(category, classes){

    switch(category){
      case 'New':
       return classes.card;
        break;
      case 'Open':
        return classes.cardOpen;
        break;
      case 'Closed':
        return classes.cardClosed;
        break;
      case 'Assigned':
        return classes.cardAssigned;
        break;
    }

}

function StatsCard({ ...props }) {
  const {
    classes,
    category,
    title,
    description,
    statLink,
    small,
    statText,
    statIconColor,
    iconColor
  } = props;

  // it is assumed there is a separator in the title
  // e.g. Twitter - San Francisco
  let [company, location] = title.split("-");
  company = company.trim();
  location = location.trim();
  

  return (
    <Card className={switchCategory(category, classes)} onClick={props.onClick}>
      
      <Typography variant="body2" className={classes.cardHeaderTitle} >
        {small}
      </Typography>
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.cardCategory}>
          {company}
        </Typography>
        <Typography
          variant="headline"
          component="h2"
          className={classes.cardTitle}
        >
          {description}{" "}
        </Typography>
        <Typography
          className={classes.cardContentSubheading}
          variant="subheading"
          gutterBottom
        >
          <LocationOn style={{ fontSize: 20 }} />
          {location}
        </Typography>

        {category === "Assigned" ? 
        ( 
          <Typography
          className={classes.cardContentSubheading}
          variant="subheading"
          gutterBottom >
          
          Assigned by John Adams
           </Typography>
          )

          : ( <div> </div>)
        }
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.cardStats}>
          <props.statIcon
            className={
              classes.cardStatsIcon +
              " " +
              classes[statIconColor + "CardStatsIcon"]
            }
            style={{top: "0px"}}
          />{" "}
          {statLink !== undefined ? (
            <a href={statLink.href} className={classes.cardStatsLink}>
              {statLink.text}
            </a>
          ) : statText !== undefined ? (
            statText
          ) : null}
        </div>
      </CardActions>
    </Card>
  );
}

StatsCard.defaultProps = {
  iconColor: "purple",
  statIconColor: "gray"
};

StatsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.func.isRequired,
  iconColor: PropTypes.oneOf(["orange", "green", "red", "blue", "purple"]),
  title: PropTypes.node,
  description: PropTypes.node,
  small: PropTypes.node,
  statIcon: PropTypes.func.isRequired,
  statIconColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  statLink: PropTypes.object,
  statText: PropTypes.node
};

export default withStyles(statsCardStyle)(StatsCard);
