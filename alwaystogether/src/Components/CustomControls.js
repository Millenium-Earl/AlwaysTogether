import React, {useRef, forwardRef} from "react";
import Typography from "@material-ui/core/Typography";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";
import FullScreenIcon from "@material-ui/icons/Fullscreen";
import Popover from "@material-ui/core/Popover";
import { TimingObject } from 'timing-object';
import SocketContext from "./Socket";



//const timingObject = new TimingObject(new TimingProvider('0123456789abcdefghij'));


const useStyles = makeStyles({
    controlsWrapper: {
    visibility: "visible",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 1,
    height :"100%",
    width:"100%",
  
  },
  controlIcons: {
    color: "#777",
    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
  },

  bottomIcons: {
    color: "#999",
    "&:hover": {
      color: "#fff",
    },
  },
  volumeSlider: {
    width: 100,
  },
});

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);











const Controls = ( props, ref ) => {

 // const socket = React.useContext(SocketContext);
    const {onPlayPause,
       played,
       playing,
        onChangeDispayFormat,
         onRewind, 
          onFastForward,
           onSeek, 
            onSeekMouseDown,
             onSeekMouseUp,
              onDuration,
               elapsedTime,
                 totalDuration,
                  muted,
                   onMute,
                    volume,
                    onVolumeChange,
                    onVolumeSeekDown,
                    onToggleFullScreen,
                    
                  } = props;




  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "playbackrate-popover" : undefined;
 

//refs 

  const play = useRef();
  const fastrewind = useRef();
  const fastforward = useRef();
  const time = useRef();
  const botPlay = useRef();
  const mute = useRef();
  const volumeSlide = useRef();




  

  return (
    <div ref={ref} className={classes.controlsWrapper}>
      {/* Ttitre and all */}
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
       
      >
        <Grid item>
          <Typography variant="h5" style={{ color: "#fff" }}>
            
          </Typography>
        </Grid>

      
      </Grid>

      {/* Middle    <<  play  >> */}

      <Grid container direaction="row" alignItems="center" justify="center">
        <IconButton ref={fastrewind} className={classes.controlIcons} aria-label="reqind" onClick={onRewind}>
          <FastRewindIcon fontSize="inherit" />
        </IconButton>

        <IconButton ref={play} className={classes.controlIcons} aria-label="reqind" onClick={onPlayPause}>
         {playing ? (
                <PauseIcon fontSize="inherit" />
              ) : (
                <PlayArrowIcon fontSize="inherit" />
              )}
        </IconButton>

        <IconButton className={classes.controlIcons} aria-label="reqind" onClick={onFastForward}>
          <FastForwardIcon ref={fastforward} fontSize="inherit" />
        </IconButton>
      </Grid>

      {/* bottom. controls */}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ padding: 16 }}
      >
        <Grid item xs={12}>
          <PrettoSlider 
            min={0}
            max={100} /* get the maxTime of the vid */
            value={played * 100} 
            ValueLabelComponent={(props) => <ValueLabelComponent {...props} value={elapsedTime} />}
            onChange={onSeek}
            onMouseDown={onSeekMouseDown}
            track={'normal'}
            onDuration={onDuration}
            onChangeCommitted={onSeekMouseUp}
            ref={time}
           
          />
        </Grid>

        <Grid item>
          <Grid container alignItems="center" direction="row">
            <IconButton className={classes.bottomIcons} onClick={onPlayPause}>
            {playing ? (
                    <PauseIcon fontSize="large" />
                  ) : (
                    <PlayArrowIcon fontSize="large" />
                  )}
            </IconButton>

            <IconButton onClick={onMute} className={classes.bottomIcons}>
            {muted ? (
                    <VolumeMute fontSize="large" />
                  ) : volume > 0.5 ? (
                    <VolumeUp fontSize="large" />
                  ) : (
                    <VolumeDown fontSize="large" />
                  )}
            </IconButton>

            <Slider ref={volumeSlide}
              min={0}
              max={100}
              value={muted ? 0 : volume * 100}
              onChange={onVolumeChange}
              className={classes.volumeSlider}
              onMouseDown={onSeekMouseDown}
              onChangeCommitted={onVolumeSeekDown}
              
            />

            <Button variant="text" style={{ color: "#fff", marginLeft: 16 }} onClick={onChangeDispayFormat}>
              <Typography  variant="body1"
                    style={{ color: "#fff", marginLeft: 16 }}>
                   {elapsedTime}/{totalDuration}
                   </Typography>  
                
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            onClick={handlePopover}
            variant="text"
            className={classes.bottomIcons}
          >
            <Typography>1X</Typography>
          </Button>
          <Popover
           container={ref.current}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Grid container direction="column-reverse">
              {[0.5, 1, 1.5, 2].map((rate) => (
                <Button variant="text">
                  <Typography color="secondary">{rate}</Typography>
                </Button>
              ))}
            </Grid>
          </Popover>
          <IconButton onClick={onToggleFullScreen} className={classes.bottomIcons}>
            <FullScreenIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};
export default forwardRef(Controls);