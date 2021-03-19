import './App.css';
import React,{ useState, useEffect, useRef } from 'react';
import { Container } from '@material-ui/core';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Join from './Components/Join'
import Chat from './Components/Chat'

import io from 'socket.io-client'


import MainTV from './Components/MainTV'




function App() {


  
  

  return (
    <div className="App" 
    backgroundcolor="black">

      <Router>
        
        <Route path='/' exact render={ props => <Join />} />
        <Route path='/mainTV' component={MainTV} />
        
        
      </Router>
       
    
    </div>
  );
}









export default App;
