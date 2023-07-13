import { useState } from 'react'
import { logic } from './components/gameLogic';
import './App.css'

export const test = (total, value) => {
  if (total - value > 0) return 0;
  if (total - value == 0) return 1
  if (total - value < 0) return 2;
}

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [turnStatus, setTurnStatus] = useState(0);
  const [totalMatchCount, setTotalCount] = useState(25);
  const [playerMatchCount, setPlayerMatchCount] = useState(0)
  const [aiMatchCount, setAiMatchCount] = useState(0);
  const [currGameStatus, setCurrGameStatus] = useState(0);

  const startGame = () => !gameStart ? setGameStart(true) : setGameStart(false)
  const countHandler = e => {
    if (totalMatchCount - e.target.value == 0 || totalMatchCount == 0) {
      setTotalCount(0);
      setPlayerMatchCount(playerMatchCount + Number(e.target.value));
      if (playerMatchCount % 2 == 0) {
        setCurrGameStatus(1);
      } else {
        setCurrGameStatus(2);
      };
    } else {
      setPlayerMatchCount(playerMatchCount + Number(e.target.value));
      setTotalCount(totalMatchCount - Number(e.target.value));

      setTimeout(async () => {
        const res = logic(playerMatchCount + Number(e.target.value), totalMatchCount - Number(e.target.value), Number(e.target.value))
        setTotalCount(res[1]);
        setAiMatchCount(aiMatchCount + res[0])
        setTurnStatus(0);
      }, 1500);
    }

  }

  return (
    <div className='main'>
      {!gameStart ? <button className='startButton' onClick={startGame}>Start game</button> : (
        <div className='gameInterface'>
          <div className="scoreBoard">
            <h2>Score</h2>
            <h4>Your score: {playerMatchCount}</h4>
            <h4>Opponent's score: {aiMatchCount}</h4>
          </div>
          <div className="totalCount">
            <h1>Total count of matches: </h1>
            <h1>{totalMatchCount}</h1>
          </div>
          {!currGameStatus == 0 ?
            (
              <>
                <h1 className='endGame'>Game over</h1>
                {currGameStatus == 1 ? (<><h1 className='endGame' style={{ color: 'green' }}>You Won</h1></>) : (<><h1 className='endGame' style={{ color: 'red' }}>You Lose</h1></>)}
              </>
            ) : turnStatus == 0 ? (
              <>
                <div className="variants">
                  <h1 className='title'>Choose the number of matches:</h1>
                  <button className='chooseVariant' value={1} disabled={test(totalMatchCount, 1) == 2} onClick={(e) => { countHandler(e); setTurnStatus(1) }}>🧨</button>
                  <button className='chooseVariant' value={2} disabled={test(totalMatchCount, 2) == 2} onClick={(e) => { countHandler(e); setTurnStatus(1) }}>🧨🧨</button>
                  <button className='chooseVariant' value={3} disabled={test(totalMatchCount, 3) == 2} onClick={(e) => { countHandler(e); setTurnStatus(1) }}>🧨🧨🧨</button>
                </div>
              </>
            ) : (
              <>
                <h1 className='endGame'>AI's turn</h1>
              </>
            )}

        </div>
      )}
    </div>
  )
}

export default App
