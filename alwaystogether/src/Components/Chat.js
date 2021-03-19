import React, {useEffect, useState} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { MessageBox, Button, Input} from 'react-chat-elements'



let socket;
const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = "localhost:5003"
        useEffect(() => {
            const {name, room} = queryString.parse(location.search)
            
            socket = io(ENDPOINT);

            setName(name);
            setRoom(room);

            socket.emit('join', { name, room },() => {
                //Error handling
            });


return() => {
    socket.emit('disconnect');
    socket.off();
}

        },[ENDPOINT,location.search])

useEffect(() => {


    socket.on('message', (message) => {
    setMessages([...messages, message]);
    })
}, [messages]);

//send message function

const sendMessage = (event) =>{
    event.preventDefault();
    if(message) {
        
        socket.emit('sendMessage', message, () => setMessage(''));
      }
    
}
console.log(message,messages);

    return (
        
        //<div className={classes.inputMess}>
        <div className={"input"}>
            
        <Input 
            placeholder="Type here..."
            value={message}
            onChange={(event) => setMessage(event.target.value) }
            onKeyPress={(event)=> event.key==='Enter' ? sendMessage(event) : null}
            multiline={false}
            rightButtons={
              <>
              </>  } 
        />

         </div>
    )
}

export default Chat