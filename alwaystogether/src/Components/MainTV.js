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

import { TimingObject } from 'timing-object';
import { timingsrc, setTimingsrc } from 'timingsrc';
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

  const [state, setState] = useState({
    isReconnecting: false,
    playing: false,
    played: 0,
    muted: false,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: true,
    seekValue: 0,



  });
  const [played, setPlayed] = useState("")


  const { playing, muted, volume, seekValue, seeking, control, light, pip } = state;
 
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


  })

  socket.on('seek4', function (data) {
    setState({ ...state, playing: false })
    console.log("arrivée Data " + data)
    // var mediaElement = 
    console.log(playerRef.current, { data })
    if (playerRef?.current)
      playerRef.current.seekTo(data / 100, "fraction")

  })


    return() => {
      socket.off('playVid2')
      socket.off('playVid1')
      socket.off('seek1')
      socket.off('seek3')
      socket.off('seek2')
      socket.off('Seek4')
    }

  }, []);
    const handleProgress = (changeState) => {  // for controls visibility (onProgress is called
    // each time so...)
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
    }
  };



  const handleRewind = () => {  //rewind
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
  };

  const handleFastForward = () => { // forward
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
  };

  const handleDisplayFormat = () => { // click for time display
    setTimeDisplayFormat(
      timeDisplayFormat === "normal" ? "remaining" : "normal"
    );
  };



  const handleSeekChange = (e, newValue) => {
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
  const handlerien = () => {
    count = 1;
  }


  const handlePlaybackRate = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const hanldeMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  useEffect(() => {

    //
    //   Object.preventExtensions(playerRef);
    //  const timingObject = new TimingObject();

    // setTimingsrc(mediaElement, timingObject);

  }, []);


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

  return (<React.Fragment>
    <Nav videoURL={videoURL} setVideoURL={setVideoURL} />




    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={playerContainerRef}
      className={classes.playerWrapper}>
      {
        state.isReconnecting ? <CircularProgress /> : <div> </div>
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