import React, { useState, useEffect, useRef } from 'react';
import { CircularProgress, colors, Container } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { SideBar } from 'react-chat-elements'
import { findDOMNode } from "react-dom";
import ReactPlayer from 'react-player'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import screenful from "screenfull";
import io from 'socket.io-client'


import Nav from './Nav';
import CustomControls from "./CustomControls"

import SocketContext from "./Socket";

import RoomChat from './RoomChat';
import { StateContext } from 'react-scroll-to-bottom';


const MainTV = (props) => {

  const socket = React.useContext(SocketContext);

  //refs 

  var playerRef = useRef();
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


  


  //States 

  const [text, setText] = useState("")
  const [count, setCount] = useState(0)
  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");
  const [videoURL, setVideoURL] = useState("")
  const [selectedFile, setSelectedFile] = useState(null);


  const [state, setState] = useState({
    isReconnecting: false,
    playing: false,
    played : 0,
    muted: false,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
    



  });
  const [played, setPlayed] = useState("")
 // const [playe, setPlaye] = useState({played : 0,})


  const {  playing, muted, volume } = state;
 // const {played } = playe
 
  // const {text} = props;
  //const media = JSON.stringify(playerRef)


  const handlePlay = () => {

    setState({ ...state, playing: !state.playing })
    socket.emit('playVid1', state.playing)

  }

  /*const handleProgress =(changeState) => {
    console.log(changeState)
    setState({...state, ...changeState})
  } 
*/

  // El sockets 
  const tryReconnect = () => {
    console.log("reconnecting")
    setState({ ...state, isReconnecting: true, playing: false })
    setTimeout(() => {
      socket.io.open((err) => {
        if (err) {
          console.log(err)
        } else {
          setState({ ...state, isReconnecting: false, })
          socket.emit('reconnected')
        }
      });
    }, 2000);
  }

  socket.io.on("close", () => {
    console.log("thardet")
    socket.disconnect()
    socket.off();
    tryReconnect()
  });
  socket.io.on("userDisconnected", () => {
    console.log("userDisconnected")
    setState({ ...state, isReconnecting: true, playing: false })
  });
  socket.io.on("userReconnected", () => {
    console.log("reconnected")
    setState({ ...state, isReconnecting: false })
  });

  useEffect(() => {


    socket.on('playVid2', (data) => {

    setState({ ...state, playing: !data })
    console.log("arrivé play" + data)

  });
  socket.on('seek2', (data) => {
    var newVal = parseFloat(data/100)

    setPlayed( newVal)
    //setState({...state, played : parseFloat(data/100)})


  })

  socket.on('seek4', function (data) {
    setState({ ...state, playing: false })
    console.log("arrivée Data " + data)
    // var mediaElement = 
    console.log(playerRef.current, { data })
    if (playerRef?.current)
      playerRef.current.seekTo(data / 100, "fraction")

  })

  socket.on('Rewind2', (data)  => {
    if (playerRef?.current)
    //playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
    playerRef.current.seekTo(data)
    setState({ ...state, playing: false})
  })
  socket.on('Forward2', (data)  => {
    if (playerRef?.current)
    //playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
    playerRef.current.seekTo(data)
    setState({ ...state, playing: false})
  })


    return() => {
      socket.off('playVid2')
      socket.off('playVid1')
      socket.off('seek1')
      socket.off('seek3')
      socket.off('seek2')
      socket.off('Seek4')
      socket.off('Rewind2')
      socket.off('Forward2')
    }

  }, [ socket]);  //Need to fix this<<<< makes
    const handleProgress = (changeState) => {  // for controls visibility (onProgress is called
    // each time so...)
    var {played} = changeState
    console.log("alone" + count)
    if (count > 2) {
      controlsRef.current.style.visibility = "hidden";

      console.log("si +3" + count)
    }

    if (controlsRef.current.style.visibility == "visible") {
      setCount(count + 1)
      console.log("incr" + count)
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
      setPlayed(played)
    }
  };



  const handleRewind = () => {  //rewind
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
    var data = playerRef.current.getCurrentTime()
    socket.emit('Rewind1',data)
  };

  const handleFastForward = () => { // forward
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
    var data = playerRef.current.getCurrentTime()
    socket.emit('Forward1', data)
    
  };

  const handleDisplayFormat = () => { // click for time display
    setTimeDisplayFormat(
      timeDisplayFormat === "normal" ? "remaining" : "normal"
    );
  };



  const handleSeekChange = (e, newValue) => {
    
   // setState({ ...state, played: parseFloat(newValue / 100) });
   setPlayed( parseFloat(newValue / 100))
  
    socket.emit('seek1', newValue)

  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    // console.log({ value: e.target });
    setState({ ...state, seeking: false, playing: false });
    // console.log(sliderRef.current.value)

    playerRef.current.seekTo(newValue / 100, "fraction");

    socket.emit('seek3', newValue)



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
    
    controlsRef.current.style.visibility = "visible";
    setCount(0)
  };

  const handleMouseLeave = () => {

    controlsRef.current.style.visibility = "hidden";
    setCount(0)

  };
 


  const handlePlaybackRate = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const hanldeMute = () => {
    setState({ ...state, muted: !state.muted });
  };



  

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

  const useStyles = makeStyles({

    playerWrapper: {
      position: "relative",
      float: "left",
      maxHeight: "100%",
      maxWidth: "84.7%", //83vw
      margin: "0",
      padding: "0",

    },
    Frag: {
      display: "flex",
      flexDirection: "row",
    },
    circle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "50%",
      bottom: "50%",

    }
  });

  const classes = useStyles();



  



  return (<React.Fragment>
    <Nav videoURL={videoURL} setVideoURL={setVideoURL} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />




    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={playerContainerRef}
      className={classes.playerWrapper}>
      {
        state.isReconnecting ?  <CircularProgress className={classes.circle} />  : <div> </div>
      }
      <div className={classes.Cwrapper}>
        <ReactPlayer
          url={videoURL}
          width="84vw"
          controls={false}
          muted={muted}
          height="93.4vh"
          margin="0"
          padding="0"
          ref={playerRef}
          playing={playing}
          volume={volume}
          onSeek={e => console.log('onSeek', e)}

          // to show onProgress={e => console.log('onProress', e)}

          onProgress={handleProgress}
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
          muted={muted}
          volume={volume}
          onMute={hanldeMute}
          onSeek={handleSeekChange}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={handleSeekMouseUp}
          onVolumeChange={handleVolumeChange}
          onVolumeSeekDown={handleVolumeSeekDown}
          onPlaybackRateChange={handlePlaybackRate}
          onToggleFullScreen={toggleFullScreen}
          socket={socket} />







      </div>
    </div>
    <RoomChat location={props.location} />


  </React.Fragment>
  )
}
export default MainTV;