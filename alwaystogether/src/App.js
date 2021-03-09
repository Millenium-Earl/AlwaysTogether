import './App.css';
import React,{ useState, useEffect, useRef } from 'react';
import { Container } from '@material-ui/core';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { SideBar } from 'react-chat-elements'
import { findDOMNode } from "react-dom";
import ReactPlayer from 'react-player'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import RoomChat from "./Components/RoomChat"
import Join from './Components/Join'
import Chat from './Components/Chat'
import screenful from "screenfull";


import {
  clearAll,
  readRecord,
  storeToLocalStorage
} from "./Utils/localStorageService";
import MainTV from './Components/MainTV'
import CustomControls from "./Components/CustomControls"

import { TimingObject } from 'timing-object';
import { setTimingsrc, TIMINGSRC } from 'timingsrc';



function App() {


  
  const [messages, setMessages] = useState([]);

  const handleAddMessage = (groupConversations, msg) => {
    // Replace the property 'type:image' with 'type: photo' of the current message as per react-chat-elements needs
    if (msg.type && msg.type === "image") {
      msg.type = "photo";
    }
  
    if (msg.data && msg.data.type && msg.data.type === "image") {
      msg.data.type = "photo";
    }
  
    setMessages([...groupConversations, ...[msg]]);
  };

  return (
    <div className="App" 
    backgroundColor="black">

      <Router>
        <Route path='/join' exact component={Join} />
        <Route path='/chat'  component={Chat} />
        <Route path ='/mainTV' component={MainTV} />
      </Router>
       {/*<Nav setText={setText} text={text}/>
      
      <MainTV text={text} />
      
      <RoomChat 
        addMessageCallback={handleAddMessage}
  messages={messages} /> */}
    
    </div>
  );
}









export default App;
