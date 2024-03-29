import React, { useEffect } from 'react'
import Die from './assets/Die'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import Confetti from 'react-confetti'
import Stopwatch from './assets/Stopwatch'



function App() {

  const [dice, setDice] = useState(allNewDie())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [timer, setTimer] = useState(false)
  
  //CHECK IF WE WON 
  useEffect(function(){
    const allHeld = dice.every(die => die.isHeld)
    const anyValue = dice[0].value
    const sameValues = dice.every(die => die.value === anyValue)
    if(allHeld && sameValues) {
      console.log('You Won!')
      setTenzies(true)
      setTimer(false)
    }
  },[dice])


  //GENERATE A NEW SINGLE RANDOM DIE
  function newDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      id: nanoid(),
      isHeld: false
    }
  }



  //GENERATE AN ARRAY WITH 10 RANDOM DICE
  function allNewDie() {
    const newArray = []
    for(let i = 0; i < 10 ; i++) {
      newArray.push(newDie())
    }
    return newArray
  }

  //CREATE ELEMENTS TO RENDER IN MAIN
  const diceElements = dice.map( die => <Die value = {die.value} key = {die.id} isHeld = {die.isHeld} holdDice = {() => holdDice(die.id)}/> )

  //ROLL ALL THE DICE
  function rollDIce() {
    if(tenzies) {
      setDice(allNewDie())
      setTenzies(false)
      setRolls(0)
      setTimer(false)
  
    } else {
      
      setDice(oldDice => oldDice.map( die => {
        return die.isHeld ? die : newDie()
      }))
      setRolls(oldRoll => oldRoll + 1)
      setTimer(true)
      

    }
  }

  //HOLD A DICE
  function holdDice(id) {
    setDice(oldDice => oldDice.map( die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
    setTimer(true)
  }




  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click each die to freeze it
      at its current value between rolls.</p>
      <div className='dice-container'>
          {diceElements}
      </div>
      <div>
        <div className='rolls-counter'>Rolls: {rolls} </div>
        <div className='timer'>Timer:<Stopwatch timer = {timer}/> </div>
      </div>
      <button className='roll-dice' onClick={rollDIce}>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>
  )

}

export default App
