import { Container, Divider } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { MessageBox, Button} from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import { MEDIA_MSG, TEXT_MSG } from "../Utils/consts";
import PubSub from "pubsub-js";
import { scrollToBottom } from '../Utils/helpers';
import { readRecord } from "../Utils/localStorageService";

import queryString from 'query-string'
import io from 'socket.io-client'
import User from '../Components/User'
import ScrollToBottom from 'react-scroll-to-bottom';
import InfoBar from "../Components/InfoBar";
import Input from "./Input";
import Messages from './Messages'
import SocketContext from "./Socket";







const RoomChat = ({ location, ENDPOINT }) => {
  const myMess = useRef();

  const socket = React.useContext(SocketContext);




  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let chemin = location.search
    const { name, room } = queryString.parse(chemin)



    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {
      //Error handling or whatever osef
    });

    console.log("login  " + socket)


    return () => {
      socket.disconnect();
      socket.off('join');
    }

  }, [ENDPOINT, location.search])

  useEffect(() => {


    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })

    console.log('mesage   ' + socket);
    
return() => {
  socket.off('message')
}
  }, [messages]);

  //send message function

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {

      socket.emit('sendMessage', message, () => setMessage(''));
    }

  }


  const useStyles = makeStyles({
    chatChat: {
      backgroundColor: "#3F51B5",
      position: "relative",
      float: "right",
      height: "93.4vh",
      maxHeight: "93.4vh",
      minHeight: "93.4vh",
      width: "15vw",
      minWidth: "15vw",
      maxWidth: "15vw",
      display: "flex",

      flexDirection: "column",
      justifyContent: "spaceBetween",



    },
    messages: {
      padding: "5%, 0",
      overflow: "auto",
      flex: "auto",
    },
    Input: {
      width: "100%",
      backgroundColor: "black",

    },
    containerChat: {
      backgroundColor: '#6b6b6b',
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: "#FFFFFF",
      borderRadius: "8px",
      overflow: "auto",
      height: "100%",
      width: "100%",
    }
  });
  const classes = useStyles();



  return (



    <div className={classes.chatChat}>
      <InfoBar room={room} socket={socket} location={location} />
      <div className={classes.containerChat} scrolled='true'>
        <div className={classes.messages}>
          <Messages ref={myMess} messages={messages} name={name} />
        </div>
      </div>
      {/* <Input
    placeholder="Type here..."
    multiline={true}
    rightButtons={
        <Button
            color='white'
            backgroundColor='black'
            text='Send'/>
    }/> */}

       <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> 
      {/*<Component user={users} pour afficher la liste des connectés 
a mettre en haut dans une icone près de profile a la place de messages  */}
    </div>)

}
export default RoomChat;