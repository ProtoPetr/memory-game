import * as R from 'rambda'
import React, { useEffect, useState } from 'react'
import * as Cell from './Cell'
import * as Board from './Board'

// LOGIC ===========================================================================================

let Status = {
  Stopped: 'Stopped',
  Running: 'Running',
  Won: 'Won',
}

let startGame = () => ({
  board: Board.makeRandom(4, 4),
  status: Status.Running,
})

let openCell = R.curry((i, state) => ({
  ...state, 
  board: Board.setStatusAt(i, Cell.Status.Open, state.board),
}))

let canOpenCell = R.curry((i, state) => {
  return Board.canOpenAt(i, state.board)
})

let succeedStep = (state) => ({
  ...state,
  board: Board.setStatusesBy(Cell.isOpen, Cell.Status.Done, state.board),
})

let disappearStep = (state) => ({
  ...state,
  board: Board.setStatusesBy(Cell.isDone, Cell.Status.Disappear, state.board),
})

let failStep1 = (state) => ({
  ...state,
  board: Board.setStatusesBy(Cell.isOpen, Cell.Status.Failed, state.board),
})

let failStep2 = (state) => ({
  ...state,
  board: Board.setStatusesBy(Cell.isFailed, Cell.Status.Closed, state.board),
})

let hasWinningCond = (state) => (
  R.filter(Cell.isDisappear, state.board).length == state.board.length
)

let setStatus = R.curry((status, state) => ({...state, status}))

// VIEW ============================================================================================

export function View() {
  let [state, setState] = useState({
    board: Board.makeRandom(4, 4),
    status: Status.Stopped,
  })

  let {board, status} = state

  function handleStartingClick(i) {
  if (status != Status.Running) {
    setState(startGame)
  }
}

function handleRunningClick(i) {
  if (status == Status.Running && canOpenCell(i, state)) {
    setState(openCell(i))
  }
}

// Winning/Loosing conditions
useEffect(_ =>{
  if (status == Status.Running && hasWinningCond(state)) {
    return setState(setStatus(Status.Won))
  }
}, [state])

// Board handling
useEffect(_ => {
  if (Board.areOpensEqual(board)) {
    setState(succeedStep)
    setTimeout(_ => {
      setState(disappearStep)
    }, 500)
  } else if (Board.areOpensDifferent(board)) {
    setState(failStep1)
    setTimeout(_ => {
      setState(failStep2)
    }, 500)
  }
}, [board])

  return <div onClick={handleStartingClick}>
    <ScreenBoxView status={status} board={board} onClickAt={handleRunningClick}/>
  </div>
}

function ScreenBoxView({status, board, onClickAt}) {
  switch (status) {
    case Status.Running:
      return <Board.BoardView board={board} onClickAt={onClickAt}/>

    case Status.Stopped:
      return <Board.ScreenView className='gray'>
        <div>
          <h1>Jet Ruby test game</h1>
          <p className='small' style={{textAlign: 'center'}}>Click anywhere to start!</p>
        </div>
      </Board.ScreenView>

    case Status.Won:
      return <Board.ScreenView className='green'>
      <div>
        <h1>Victory!</h1>
        <p className='small' style={{textAlign: 'center'}}>Click anywhere to try again!</p>
      </div>
    </Board.ScreenView>
  }
}



