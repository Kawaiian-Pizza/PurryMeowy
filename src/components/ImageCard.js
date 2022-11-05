import React from "react"

class ImageCard extends React.Component{
  constructor(props){
    super(props);
    this.state={spans:0}
    this.imageRef = React.createRef();
  }
 
  componentDidMount(){
    this.imageRef.current.addEventListener("load", this.setSpans)
  }

  setSpans = () => {//must be outside componentdidmount
   const height = this.imageRef.current.clientHeight
   const spans = Math.ceil((height+30) / 9)
   this.setState({spans})
   }

 render(){
   const {name,imgurl}=this.props
   
   return(
   <div className="grid-item"  style={{gridRowEnd:`span ${this.state.spans}`}}>
     <img
     ref={this.imageRef} //ref is jsx tag, not DOM
     src={imgurl}
     />
     <div className="breed-name">{name}</div>
   </div>
   )
 }
}

export default ImageCard