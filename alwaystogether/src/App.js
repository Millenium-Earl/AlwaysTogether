import './App.css';
import React,{ useState, useEffect, useRef } from 'react';
import { Container } from '@material-ui/core';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Join from './Components/Join'


import io from 'socket.io-client'
import SocketContext, { socket } from "./Components/Socket";


import MainTV from './Components/MainTV'




function App() {


  
  

  return (
    <div className="App" 
    backgroundcolor="black">
    <SocketContext.Provider value={socket}>
      
   
      <Router>
        
        <Route path='/' exact render={ props => <Join />} />
        <Route path='/mainTV' component={MainTV} />
        
        
      </Router>
       
      </SocketContext.Provider>
    </div>
  );
}









export default App;
