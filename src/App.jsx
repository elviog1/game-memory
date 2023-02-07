import { useEffect, useState } from 'react'
import Card from './components/Card'
import './styles/App.css'
import {data} from './images'
import JSConfetti from 'js-confetti'

function App() {
  const jsConfetti = new JSConfetti()
  const [cards,setCards] = useState([])
  const [firstCard,setFirstCard] = useState({})
  const [secondCard,setSecondCard] = useState({})
  const [unflippedCards,setUnflippedCards] = useState([]) // cartas que vuelven a su posicion original
  const [disabledCards,setDisabledCards] = useState([]) // cartas que hicieron match
  const [totalCards,setTotalCards] = useState()
  const [win,setWin] =useState(false)

  useEffect(()=>{
    shuffledArray(data)
    setCards(data)
    setTotalCards(data.length)
  },[])
  console.log(totalCards)

  useEffect(()=>{
    checkForMatch()
  },[secondCard])

  useEffect(()=>{
    if(totalCards == 0){
      jsConfetti.addConfetti()
      setWin(!win)
      setTotalCards(data.length)
      setDisabledCards([])
    }
  },[totalCards])

  const shuffledArray = (array)=>{ // desordena un array
    for( let i = array.length -1 ; i > 0 ; i--){
     let j = Math.floor(Math.random() * ( i + 1))
     let temp = array[i]
     array[i] = array[j]
     array[j] = temp 
    }
  }

  const flipCard = (name,number)=>{
    if(firstCard.name === name && firstCard.number === number){
      return 0 // estoy tocando la misma card
    }
    if(!firstCard.name){
      setFirstCard({name,number})
    }else if(!secondCard.name){
      setSecondCard({name,number})
    }
    return 1
  }

  const checkForMatch = ()=>{
    if(firstCard.name && secondCard.name){
      const match = firstCard.name == secondCard.name
      match ? disableCards() : unflipCards()
    }
  }

  const disableCards = ()=>{
    setDisabledCards([firstCard.number,secondCard.number])
    resetCards()
    setTotalCards(totalCards-2)
  }
  const unflipCards = ()=>{
    setUnflippedCards([firstCard.number,secondCard.number])
    resetCards()
    
  }
  const resetCards = ()=>{
    setFirstCard({})
    setSecondCard({})
  }

  const resetGame = (e)=>{
    setWin(!win)

  }
  return (
    <div className="app">
      {win ? 
      <div className='div-win'>
        <h1 className='win'>Ganaste !</h1>
        <button className='button-win' onClick={resetGame}>Reiniciar</button>
      </div>
      :
        <div className="cards-container">
          {cards.map((card,index) => (
            <Card 
              name={card.name} 
              number={index}
              frontFace={card.image}
              flipCard={flipCard}
              unflippedCards={unflippedCards}
              disabledCards={disabledCards}
            />
          ))}
        </div>
      
      }
    </div>
  )
}

export default App
