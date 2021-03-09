import { Container } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { MessageBox, Button, Input} from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import { MEDIA_MSG, TEXT_MSG } from "../Utils/consts";
import PubSub from "pubsub-js";
import { scrollToBottom } from '../Utils/helpers';
import { readRecord } from "../Utils/localStorageService";
import { sendChatMessage } from "../ChatAPI/chat";
import User from '../Components/User'




export default function RoomChat({addMessageCallback, messages }) {


    const inputRef = useRef("");
  const messagesAreaRef = useRef();
  const [message, setMessage] = useState("");
  const [updatedMessages, setUpdatedMessages] = useState([]);

  const mySubscriber = (msg, data) => {
    if (msg === TEXT_MSG || msg === MEDIA_MSG) {
      addMessageCallback(updatedMessages, data);
    }
  };

  PubSub.subscribe(TEXT_MSG, mySubscriber);
  PubSub.subscribe(MEDIA_MSG, mySubscriber);

  useEffect(() => {
    setUpdatedMessages(messages);
    scrollToBottom(messagesAreaRef.current);
  }, [messages]);

  const clearTextInput = () => {
    setMessage("");
    inputRef.current.clear();
  };

  const processMessage = messageToBeSent => {
    if (messageToBeSent === "") return;

    sendChatMessage(messageToBeSent).then(msg => {
      addMessageCallback(updatedMessages, msg);
      const messagesArea = messagesAreaRef.current;
      const shouldScroll = messagesArea.scrollTop + messagesArea.clientHeight !== messagesArea.scrollHeight;

            if (shouldScroll) {
                scrollToBottom(messagesArea);
            }

      clearTextInput();
    });
  };

  const handleSend = () => {
    processMessage(message);
  };


    
    const useStyles = makeStyles({
        chatChat: {
            backgroundColor: "#3F51B5",
            position: "relative",
            float: "right",
            height: "93.4vh",
            width : "15vw",
           

         },
         messages : {
                height: "81.7vh",
                
         },
         inputMess : {
             width :"15vw",
             backgroundColor :"black",

         },
    });
    const classes = useStyles();
    return(
    <div>
        
        <Container className={classes.chatChat}>
            <div className={classes.roomName}>
            <p> UN CHAT</p>
            </div>

            <div className={classes.messages}>
            
            <MessageBox
    position={'left'}
    type={'text'}
    text={'Tay tay'}
    data={{
        uri: 'https://formations.univ-amu.fr/images/logo-light.png',
        status: {
            click: false,
            loading: 0,
        }
    }}/>
    <MessageBox
    position={'left'}
    type={'text'}
    text={'Oui bonjou'}
    data={{
        uri: 'https://formations.univ-amu.fr/images/logo-light.png',
        status: {
            click: false,
            loading: 0,
        }
    }}/>


<div className="messages-list" ref={messagesAreaRef}>
          {updatedMessages.map((msg, idx) => {
            const isSender = msg.sender.uid === readRecord('username');
            return (
              <div className={isSender ? " message left" : "message right"} key={idx}>
                {isSender && <User userData={msg.sender} />}
                <MessageBox
                  key={idx}
                  position={isSender ? "left" : "right"}
                  type={msg.type}
                  onClick={() => window.open(msg.data.url)}
                  text={msg.text}
                  data={{
                    uri: msg.data.url,
                    status: {
                      click: false,
                      loading: 0
                    }
                  }}
                />
                {!isSender && <User userData={msg.sender} />}
              </div>
            )
          })}
        </div>

            </div>



            <div className={classes.inputMess}>


            <Input
            placeholder="Type here..."
            ref={inputRef}
            multiline={false}
            rightButtons={
              <>
                <div className="upload-btn-wrapper">
                  <input
                    type="file"
                    id="media"
                    onChange={e =>
                      processMessage(document.getElementById("media").files[0])
                    }
                  />
                  <button className="upload-btn">
                    <img
                      alt="Upload file"
                      src="https://img.icons8.com/metro/26/000000/send-file.png"
                    />
                  </button>
                </div>
                <Button
                  color="white"
                  backgroundColor="black"
                  text="SEND"
                  onClick={handleSend}
                />
              </>
            }
            onKeyPress={e => {
              if (e.key === "Enter") {
                processMessage(e.target.value);
              }
            }}
            onChange={e => setMessage(e.target.value)}
            inputStyle={{
              border: "2px solid #dedede",
              backgroundColor: "#f1f1f1",
              borderRadius: "5px",
              padding: "10px",
              margin: "10px 0"
            }}
          />


            </div>
        

        </Container>
    </div>)
}