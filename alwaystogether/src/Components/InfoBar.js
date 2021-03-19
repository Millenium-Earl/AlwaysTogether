import React, {useEffect} from 'react';

import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core';
import {  withStyles } from "@material-ui/core/styles";
import io from 'socket.io-client'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';





const InfoBar = ({ room, socket }) =>  {



const handleOut = () => {
  socket.disconnect();
  socket.off();

  
}
    const useStyles = makeStyles({
        infoBar :{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#3F51B5",
            borderRadius: "4px 4px 0 0",
            height: "5vh",
            width: "100%",
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
      <Button component={Link} to="/"  style={{ color:"red"}}>
      <CancelIcon  onClick={handleOut} /> 
      </Button>
      
      
    </div>
  </div>
)};

export default InfoBar;