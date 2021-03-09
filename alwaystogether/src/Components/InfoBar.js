import React from 'react';

import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core';
import {  withStyles } from "@material-ui/core/styles";



const InfoBar = ({ room }) =>  {
    const useStyles = makeStyles({
        infoBar :{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#2979FF",
            borderRadius: "4px 4px 0 0",
            height: "5vh",
            width: "20vw",
          },
          
          leftInnerContainer: {
            flex: "0.5",
            display: "flex",
            alignItems: "center",
            marginIeft: "5%",
            color: "white",
          },
          
          rightInnerContainer :{
            display: "flex",
            flex: "0.5",
            justifyContent: "flex-end",
            marginRight: "5%",
          },
          
          onlineIcon: {
            marginRight: "5%",
          },
    });
    
    const classes = useStyles();
return (
    
  <div className={classes.infoBar}>
    <div className={classes.leftInnerContainer}>
        <FiberManualRecordTwoToneIcon style={{ color: 'lightgreen'}} />
      {/*<img className="onlineIcon" src={onlineIcon} alt="online icon" /> */}
      <h3>{room}</h3> 
    </div>
    <div className={classes.rightInnerContainer}>
      <a href="/join"> <CancelIcon /></a>
    </div>
  </div>
)};

export default InfoBar;