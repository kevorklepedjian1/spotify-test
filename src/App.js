import './App.css';
import {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row , Card , Button , FormControl, InputGroup,  } from 'react-bootstrap'
import {
  BrowserRouter as Router , Route , Routes} from "react-router-dom";
import Search from './Components/Search';


function App() {

  return (
   
    
    <Router>
      <Routes>
        <Route exact path='/' element={<Search/>}/>
      </Routes>
    </Router>
   
   
  );
}

export default App;
