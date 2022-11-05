import "../styles/imagelist.scss"
import React from "react"
import ImageCard from "../components/ImageCard"


const ImageList = props => {
  const images = props.images.map((image)=>{
    return <ImageCard key={image.id} image={image}/>
  });
  //key is assigned to root element!
  //if the images are wrapped by a div
  //the key is assigned to the div instead
  return <div className="image-list">{images}</div>
}

export default ImageList