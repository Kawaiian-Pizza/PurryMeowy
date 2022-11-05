/* import streams from "../apis/streams" */

import history from "../history"
import axios from "axios"
import {
  FETCH_ALL_BREEDS,
  FETCH_CATINFO,
  GENERATE_OPTIONS,
  SET_HAS_WON,
  CHANGE_TO_NEXT_Q} 
  from "./types"

  export const fetchAllBreeds = () => async dispatch => {
    axios.defaults.headers.common['live_kw52Woc6FAY9ycoQsonrYJ8SZoSC5GTUyyMDxga0p4SqiZkKJqR7QN0p1JpKObbh'] = "DEMO-API-KEY" // Replace this with your API Key, as it's set to defaults it will be used from now onwards
    const res = await axios.get("https://api.thecatapi.com/v1/breeds/")
    let fetchedbreeds = res.data;
    let listofbreeds = fetchedbreeds.map(fetchedbreed=>{
      return fetchedbreed.name
    })
    dispatch({
      type: FETCH_ALL_BREEDS,
      payload: listofbreeds
    })
  }

  export const fetchCatInfo = () => async (dispatch, getState) => {
    const response = await axios.get("https://api.thecatapi.com/v1/images/search?limit=4&has_breeds=1&api_key=live_kw52Woc6FAY9ycoQsonrYJ8SZoSC5GTUyyMDxga0p4SqiZkKJqR7QN0p1JpKObbh")
    dispatch({
      type: FETCH_CATINFO,
      payload: response.data
    })
  }

  export const generateOptions = () => async(dispatch, getState) => {
    axios.defaults.headers.common['live_kw52Woc6FAY9ycoQsonrYJ8SZoSC5GTUyyMDxga0p4SqiZkKJqR7QN0p1JpKObbh'] = "DEMO-API-KEY" // Replace this with your API Key, as it's set to defaults it will be used from now onwards
    const res = await axios.get("https://api.thecatapi.com/v1/breeds/")
    let fetchedbreeds = res.data;
    let listofbreeds = fetchedbreeds.map(fetchedbreed=>{
      return fetchedbreed.name
    })
    const {breedAnswer} = getState() 
    const breeds = listofbreeds
    const newArray=[breedAnswer]
      let newBreedInfos = breeds.filter(data => data != breedAnswer)

      function get_rand(array) {
        let rand = array[Math.floor(Math.random() * array.length)]
        if (!newArray.includes(rand)){
          let num = Math.floor(Math.random() * 2)
          if (num > 0){
            newArray.push(rand)}
          else {
            newArray.unshift(rand)
          }
        } else {
          get_rand(newBreedInfos);
        }
      }
      for (var i = 0; i < 3; i++) {
        get_rand(newBreedInfos);
      }
    dispatch({
      type: GENERATE_OPTIONS,
      payload: newArray
    })
  } 


    export const setHasWon = () => {
    return{
        type: SET_HAS_WON
      }
    }

    export const changeToNextQ = () => {
      return{
        type: CHANGE_TO_NEXT_Q
      }
    }
    

    