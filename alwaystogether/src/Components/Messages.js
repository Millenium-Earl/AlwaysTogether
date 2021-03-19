import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import { makeStyles} from "@material-ui/core/styles";

import Message from './Message'

const useStyles = makeStyles({
    messages : {
        padding: "5%, 0",
        overflow: "auto",
        flex: "auto",
      }
      
}) 
const classes = useStyles;


const Messages = ({ messages, name }) => (
<ScrollToBottom className={classes.messages}>
    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
  </ScrollToBottom>
);

export default Messages;