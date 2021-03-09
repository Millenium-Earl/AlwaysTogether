import React,{ useState, useEffect, useRef } from 'react';
import { Container } from '@material-ui/core';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { SideBar } from 'react-chat-elements'
import { findDOMNode } from "react-dom";
import ReactPlayer from 'react-player'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import screenful from "screenfull";



import Nav from './Nav';
import CustomControls from "./CustomControls"

import { TimingObject } from 'timing-object';
import { setTimingsrc, TIMINGSRC } from 'timingsrc';


const MainTV = (props) => {
   

  

    //refs 
      const playerRef = useRef();
      const playerContainerRef = useRef();
      const controlsRef = useRef();
    
    
      //Format (found)
      const format = (seconds) => {
        if (isNaN(seconds)) {
          return `00:00`;
        }
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, "0");
        if (hh) {
          return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
        }
        return `${mm}:${ss}`;
      };
      
      
      const [text, setText] = useState("")
    //States 
    var count = 0;
     // const [showControls, setShowControls] = useState(false);
      const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");

    
      const [state, setState] = useState({
    
        playing:false,
        played:0,
        muted: true,
        duration: 0,
        playbackRate: 1.0,
        volume: 1,
        loop: false,
        seeking: false,
    
    
    });
    
    
      const {playing,played, muted, volume, seeking, control, light, pip} = state;
     // const {text} = props;
    
      
      const handlePlay = () => {
        setState({...state, playing: !state.playing})
      }
      /*const handleProgress =(changeState) => {
        console.log(changeState)
        setState({...state, ...changeState})
      } 
    */
    
    
      const handleProgress = (changeState) => {
        if (count > 3) {
          controlsRef.current.style.visibility = "hidden";
          count = 0;
        }
        
        if (controlsRef.current.style.visibility === "visible") {
          count += 1;
        }
        if (!state.seeking) {
          setState({ ...state, ...changeState });
        }
      };
    
    
      const handleRewind = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
      };
    
      const handleFastForward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
      };
      
      const handleDisplayFormat = () => {
        setTimeDisplayFormat(
          timeDisplayFormat === "normal" ? "remaining" : "normal"
        );
      };
      
      const handleSeekChange = (e, newValue) => {
        console.log({ newValue });
        setState({ ...state, played: parseFloat(newValue / 100) });
      };
    
      const handleSeekMouseDown = (e) => {
        setState({ ...state, seeking: true });
      };
    
      const handleSeekMouseUp = (e, newValue) => {
        console.log({ value: e.target });
        setState({ ...state, seeking: false });
        // console.log(sliderRef.current.value)
        playerRef.current.seekTo(newValue / 100, "fraction");
      };
    
      const handleDuration = (duration) => {
        setState({ ...state, duration });
      };
    
      const handleVolumeSeekDown = (e, newValue) => {
        setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
      };
      const handleVolumeChange = (e, newValue) => {
        
        setState({
          ...state,
          volume: parseFloat(newValue / 100),
          muted: newValue === 0 ? true : false,
        });
      };
    
      const toggleFullScreen = () => {
        screenful.toggle(playerContainerRef.current);
      };
    
      const handleMouseMove = () => {
        console.log("mousemove");
        controlsRef.current.style.visibility = "visible";
        count = 0;
      };
    
      const handleMouseLeave = () => {
        
        controlsRef.current.style.visibility = "hidden";
        count = 0;
        
      };
      const handlerien = () => {
        count =1;
      }
    
      
      const handlePlaybackRate = (rate) => {
        setState({ ...state, playbackRate: rate });
      };
    
      const hanldeMute = () => {
        setState({ ...state, muted: !state.muted });
      };
    /*  
      const timingObject = new TimingObject(new TimingProvider('0123456789abcdefghij'));
      
      const playButton = document.getElementById('play');
    
    
      playButton.addEventListener('click', () => {
        const { position, velocity } = timingObject.query();
    
        if (position === 100 && velocity === 0) {
            timingObject.update({ position: 0, velocity: 1 });
        } else {
            timingObject.update({ velocity: 1 });
        }
    });
    
    const player = this.myRef.current;
    */
      
    
    
      const useStyles = makeStyles({
    
      Cwrapper: {
        position: "relative",
        float :"left",
        height: "100%",
        width: "84vw",
        margin  :"0",
        padding:"0",
        
      },
      playerWrapper : {
        height:"100%",
        width:"85vw",
      }
      });  
      const classes = useStyles();
      
      
      
      const currentTime =
      playerRef && playerRef.current
        ? playerRef.current.getCurrentTime()
        : "00:00";
      const duration =
        playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
      const elapsedTime =
        timeDisplayFormat === "normal"
          ? format(currentTime)
          : `-${format(duration - currentTime)}`;
    
      const totalDuration = format(duration);
    
      // var to = new TimingObject();
      //playerRef.current.timingsrc = to;
    
      return (<div>
           <Nav text={text} setText={setText} / >
        <Container className={classes.Cwrapper}
        maxWidth='false'
        height='100vh'>
    
    
          <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={playerContainerRef}
          className={classes.playerWrapper}>
          <ReactPlayer className="react-player"
              url= {text}
              width="85vw"
              controls= {0}
              muted = {muted}
              height="93.4vh"
              margin ="0"
              padding="0"
              ref={playerRef}
              playing={playing}
              volume = {volume}
              
              onProgress ={handleProgress}
            />
    
            
            <CustomControls 
                            onPlayPause={handlePlay} 
                            played={played}
                            playing={playing}
                            ref={controlsRef}
                            onChangeDispayFormat={handleDisplayFormat} 
                            onRewind={handleRewind}
                            onFastForward={handleFastForward} 
                            elapsedTime={elapsedTime}
                            totalDuration={totalDuration}
                            onDuration={handleDuration}
                            muted = {muted}
                            volume = {volume}
                            onMute={hanldeMute}
                            onSeek={handleSeekChange}
                            onSeekMouseDown={handleSeekMouseDown}
                            onSeekMouseUp={handleSeekMouseUp}
                            onVolumeChange={handleVolumeChange}
                            onVolumeSeekDown={handleVolumeSeekDown}
                            onPlaybackRateChange={handlePlaybackRate}
                            onToggleFullScreen={toggleFullScreen} />
    
    
    
    
           
              </div>
        </Container>
        </div>
      )
    }
export default MainTV;