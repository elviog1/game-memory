import React, { useEffect, useState } from 'react'
import ReactCardFlip from 'react-card-flip'

export default function Card( {name,number,frontFace,flipCard,unflippedCards,disabledCards}) {
  const backFace = "https://us.123rf.com/450wm/geraktv/geraktv1204/geraktv120400002/13159473-fondo-de-la-tormenta-de-lluvia-con-la-imagen-oscura-collage-nubes.jpg?ver=6"
  const [isFlipped,setIsFlipped] = useState(false)
  const [hasEvent,setHasEvent] = useState(true)

  useEffect(()=>{
    if(unflippedCards.includes(number))
      setTimeout(()=> setIsFlipped(false), 700)
  },[unflippedCards])

  useEffect(()=>{
    if(disabledCards.includes(number)){
      setHasEvent(false)
    }
  },[disabledCards])

  const handleClick = (e)=>{
    const value = flipCard(name,number)
    if(value !== 0){
      setIsFlipped(!isFlipped)
    }
  }
  return (
    <div className='card'>
      <ReactCardFlip isFlipped={isFlipped}>
        <img className='card-image' alt='back-face' src={backFace} onClick={hasEvent ? handleClick : null }/>
        <img className='card-image' alt='front-face' src={frontFace} onClick={hasEvent ? handleClick : null}/>
      </ReactCardFlip>
    </div>
  )
}
