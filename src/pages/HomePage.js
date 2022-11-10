import React from "react"
import { connect } from "react-redux"
import {fetchAllBreeds,
  fetchCatInfo,
  generateOptions, 
  setHasWon,
  changeToNextQ} from "../actions"
import Option from "../components/Option"
import ImageCard from "../components/ImageCard"
import "../styles/homepage.scss"
const imgLoading ="/imgs/run_cat_smile.png"
const imgFinal ="/imgs/animal_dance_cat.png"
const img0 = "/imgs/magnifier_animal_neko.png"
const img1 = "/imgs/pet_tehe_cat.png"
const img2 = "/imgs/zutsu_neko.png"
const img3 = "/imgs/pet_cat_kedukuroi.png"
const img4 = "/imgs/neko_punchflipped.png"

class HomePage extends React.Component{
  state = {
    showDescription: false, 
    attemptCount: 0,
    isEnded: false 
  }

  componentDidMount(){
    this.props.fetchCatInfo()
  }  

  componentDidUpdate(prevProps) {
     if(prevProps.breedAnswer!==this.props.breedAnswer || prevProps.questionNumber!==this.props.questionNumber){
      this.props.generateOptions() 
      }
  }

  renderSpeakingCatImg(){
    if(this.props.hasWon){return img4} 
    if(this.state.attemptCount===0){return img0}
    if(this.state.attemptCount===1){return img1}
    if(this.state.attemptCount===2){return img2}
    if(this.state.attemptCount===3){return img3}
    return
  }

  renderSpeakingCatSpeechBubble(){
    if(this.props.hasWon){
      let paragraphs = []
        paragraphs.push(<p>Correct!</p>)
        paragraphs.push(<p className="speaking-cat__speech-bubble__content">{`The answer is ${this.props.breedAnswer}.`}</p>)
      return paragraphs
    } 
    if(this.state.attemptCount===0){return `Guess my breed! Q.${this.props.questionNumber+1}`}
    if(this.state.attemptCount===1){return "Try again..."}
    if(this.state.attemptCount===2){return "Try harder..."}
    if(this.state.attemptCount===3){return "Almost there!"}
    return
  }

  renderOptions(){
    if(this.props.optionsArray){
    return this.props.optionsArray.map(((breedOption, idx)=>{
        return(
          <Option 
          key={idx}
          breedOption={breedOption} 
          breedAnswer={this.props.breedAnswer}
          addGuessCount={()=>{this.setState({attemptCount: this.state.attemptCount + 1})}} 
          hasWon={this.props.hasWon}
          checkWon={() => {
            if (breedOption === this.props.breedAnswer){
              return (this.props.setHasWon())}
            else return}
          }/>
        )
      }))
    }
    else return
  } 


  arrowOnClick(){
    if(this.props.questionNumber <= 2){
      this.setState({attemptCount: 0})
      this.setState({showDescription: false})
      this.props.changeToNextQ()
    }
    if(this.props.questionNumber === 3){
      this.setState({isEnded: true})
    }
  }

  renderHomepageContent() {
    let currentBreed = this.props.catInfo[this.props.questionNumber]
    let renderRatingBoxes = (num) => {
      let rows = []
      for (let i = 0; i < num; i++) {
        rows.push(<div className="full-box rating-box"></div>)
      }
      for (let i = 0; i < (5-num); i++) {
        rows.push(<div className="empty-box rating-box"></div>)
      }
      return rows
    }

    return (
      <div className="homepage__container">

        <div className="speaking-cat__container">
          <img className="speaking-cat__img" src={this.renderSpeakingCatImg()}></img>
          <span className="speaking-cat__speech-bubble">{this.renderSpeakingCatSpeechBubble()}</span>
        </div> 

        <div className="game-area__container">
          <div className="question-area__img__container">
            <img className="question-area__img" src={currentBreed.url}></img>
          </div>
          <div className={`options__container  ${this.props.hasWon ? "invisible" : "visible"}`}>
                {this.renderOptions()} 
          </div> 

          <div className={`answer-area__container ${this.props.hasWon ? "visible" : "invisible"}`}>
          <div className={`answer-area__ratings__container ${this.state.showDescription ? "invisible" : "visible"}`}>
            <div className="answer-area__ratings__content">
              <div>Dog-Friendly:</div><div className="answer-area__ratings__boxes">{renderRatingBoxes(currentBreed.breeds[0].dog_friendly)}</div>
              <div>Child-Friendly:</div><div className="answer-area__ratings__boxes">{renderRatingBoxes(currentBreed.breeds[0].child_friendly)}</div>
              <div>Energy Level:</div><div className="answer-area__ratings__boxes">{renderRatingBoxes(currentBreed.breeds[0].energy_level)}</div>
              <div>Social Needs:</div><div className="answer-area__ratings__boxes">{renderRatingBoxes(currentBreed.breeds[0].social_needs)}</div>
            </div>
          <div className="answer-area__show-more" onClick={()=>{this.setState({showDescription: true})}}>
              &gt;&gt; View descriptions &lt;&lt;
            </div>
          </div>

            <div className={`answer-area__description__container ${this.state.showDescription ? "visible" : "invisible"}`}>
              <div className="answer-area__description__content">{currentBreed.breeds[0].description}</div> 
              <div className="answer-area__show-more" onClick={()=>{this.setState({showDescription: false})}}>&gt;&gt; View ratings	&lt;&lt;</div>
            </div>
          </div> 

          <span className={`answer-area__arrow ${this.props.hasWon ? "visible" : "invisible"}`}>
                <i className={`fa-solid fa-chevron-right`}
                  onClick={()=>{this.arrowOnClick()}}></i>
        </span> 

        </div>

      </div>
    )
  }

  renderAllAnswers(){
    const images = this.props.catInfo.map((breed, idx)=>{
      return <ImageCard key={idx} imgurl={breed.url} name={breed.breeds[0].name}/>
    });
    //key is assigned to root element!
    //if the images are wrapped by a div
    //the key is assigned to the div instead
    return <div className="image-list">{images}</div>
  }


  render(){
    if(!this.props.catInfo){
      return (
      <div className="homepage__container">
        <div className="loading__speaking-cat__container">
          <img className="loading__speaking-cat__img" src={imgLoading}></img>
          <span>Loading...</span>
         </div> 
    </div>
      )
    }
    else if(this.state.isEnded){
      return (
      <div className="finalpage__container">
        <div className="final__container">
          <img className="final__speaking-cat__img" src={imgFinal}></img>
          <div className="final__title-lg">Congratulations!</div>
          <div className="final__title-sm">You have learnt about the following breeds today:</div>
           {this.renderAllAnswers()} 
           <div className="final__title-sm">Refresh the page to play again!</div>
        </div>
    </div>
      )
    }
    else if(this.props.questionNumber<= 3){
    return(
      <div key={this.props.questionNumber}>
        {this.renderHomepageContent()}
      </div>
    )}
    
  }
} 

const mapStateToProps = (state) =>{
  return {
    breeds: state.breeds,
    catInfo: state.catInfo,
    breedAnswer: state.breedAnswer,
    optionsArray: state.optionsArray,
    hasWon: state.hasWon,
    questionNumber: state.questionNumber
  } 
}

export default connect(
  mapStateToProps,
  {fetchAllBreeds,
  fetchCatInfo,
  generateOptions, 
  setHasWon,
  changeToNextQ
}
)(HomePage)
