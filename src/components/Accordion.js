import React, {useState} from "react";

const Accordion = ({title, p1, p2, p3, p4}) => {
   const [isShow, setIsShow] = useState(true) 
      return (
      <div className="accordion__container">
        <button className={`accordion__header ${isShow ? "active" : ""}`} onClick={()=>{setIsShow(!isShow)}}>{title}</button>
        <div className={`accordion__panel ${isShow ? "visible" : "invisible"}`}>
          <p>{p1}</p>
          <p>{p2}</p>
          <p>{p3}</p>
          <p>{p4}</p>
        </div>
      </div>
      )
}

export default Accordion