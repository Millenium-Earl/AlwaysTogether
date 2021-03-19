import React from 'react';

import 'react-chat-elements/dist/main.css';
import { SystemMessage } from 'react-chat-elements'




import { MessageBox } from 'react-chat-elements';

import ReactEmoji from 'react-emoji';

import '../CSS/message.css'
const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  let isSystem = false;
  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }
  if(user === "admin") {
    isSystem = true
  }

  return (
    isSentByCurrentUser
      ? (
        <MessageBox
        position={'right'}
        type={'text'}
        text={ReactEmoji.emojify(text)}
        title={trimmedName}
        titleColor={"blue"}
        notch={false}
        focus={"true"}
        
        />
    
        )
        : isSystem 
        ? (
          <SystemMessage
    text={text}/>
        ) : (
          <MessageBox
        position={'left'}
        type={'text'}
        text={ReactEmoji.emojify(text)}
        title={user}
        titleColor={"orange"}

        
        />
        )
  );
}

export default Message;
