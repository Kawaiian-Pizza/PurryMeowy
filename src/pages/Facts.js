import React, {useState} from "react";
import Accordion from "../components/Accordion";
import accordionData from  "../data/accordion.json";
import "../styles/facts.scss"
const dancingcatimg = "/imgs/animal_dance_cat.png"


const Facts = () => {

  const renderAccordion = (accordionData) => {
    return accordionData.map((accordion)=>{
      return <Accordion key={accordion.id} {...accordion}/>
    })
  }

  return(
    <div className="facts__container">
      <div className="intro__container">
        <img className="dancing-cat__img" src={dancingcatimg}></img>
        <div className="dancing-cat__speech">
          <p>I know, I know.</p>
          <p>We are indeed mysterious creatures.</p>
          <p>Don't worry. I'll help you know more about us!</p>
      </div>
      <div>Source: <a href="https://www.animalwised.com/purebred-vs-mixed-breed-cats-advantages-and-disadvantages-758.html">AnimalWised</a></div>
      </div>
    {renderAccordion(accordionData)}
    </div>
  )
}

export default Facts