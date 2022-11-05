import {FETCH_ALL_BREEDS,
  FETCH_CATINFO,
  GENERATE_OPTIONS,
  SET_HAS_WON,
  CHANGE_TO_NEXT_Q
} from "../actions/types" 

  const INITIAL_STATE={
    breeds: null,
    catInfo: null,
    breedAnswer: null,
    optionsArray: [],
    hasWon: false,
    questionNumber: 0
  }
  

  export default (state=INITIAL_STATE, action)=>{
    switch (action.type) {
      case FETCH_ALL_BREEDS:
        return {...state, breeds: action.payload}
  
      case FETCH_CATINFO:
        return {...state, catInfo: action.payload, breedAnswer: action.payload[state.questionNumber].breeds[0].name}

      case GENERATE_OPTIONS:
        return {...state, optionsArray: action.payload}
  
      case SET_HAS_WON:
        return { ...state, hasWon: true}

      case CHANGE_TO_NEXT_Q:
        return {...state, questionNumber: state.questionNumber+1, breedAnswer: state.catInfo[state.questionNumber+1].breeds[0].name, hasWon: false, optionsArray: []}
  
      default:
        return state
      }
    }