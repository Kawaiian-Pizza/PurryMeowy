import React, {useState} from "react";

const Button = (props) => {
  const [outcome, setOutcome] = useState("Default")
  const [isDisabled, setIsDisabled] = useState(false)
  
  const checkAnswer = () => {
    if (props.breedOption === props.breedAnswer){
      setOutcome("Correct")
      props.checkWon()
      props.addGuessCount()
    }
    else{(setOutcome("Incorrect"))
    setIsDisabled(true)
    props.addGuessCount()
  }
  }

  return ( 
    <button 
      onClick={checkAnswer}
      className={               
        outcome === "Correct" ? "correct-choice" :
        props.hasWon === true ? "incorrect-choice" :
        outcome === "Incorrect" ? "incorrect-choice" :
        ""
        
      }
       disabled={               
        props.hasWon === true ? true :
        isDisabled === true ? true
        : false
      } 
      >
      {props.breedOption}
    </button>
  )
}

export default Button