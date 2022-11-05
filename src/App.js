
import React from "react";

/* import { Router, Route, Routes } from "react-router-dom" */
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import NavBar from "./components/NavBar"
import history from "./history"
import HomePage from "./pages/HomePage"
import Facts from "./pages/Facts"

const App = () => {
  return (
    <Router history={history}> 
    <>
      <NavBar /> 
      <Routes>
        <Route path="/" exact element={<HomePage/>}/>
        <Route path="/facts" exact element={<Facts/>}/>
      </Routes> 
    </>
  </Router>
    )
} 

//Header must be inside browser router

export default App



 