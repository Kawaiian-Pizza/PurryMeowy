//npm install react-router-dom@5
//npm install --save redux react-redux
//npm i bootstrap
//npm install redux-form --legacy-peer-deps
//npm i redux-thunk --save
//npm i sass

import React from "react"
import ReactDOM from "react-dom/client"
import {Provider} from "react-redux"
import{createStore, applyMiddleware, compose} from "redux"
import reduxThunk from "redux-thunk"

 import "./styles/general.scss" 

import App from "./App"
import reducers from "./reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
  )


const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
    <Provider store={store}>
    <App/>
  </Provider>
)