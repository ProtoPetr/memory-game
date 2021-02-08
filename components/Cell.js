import React from "react"

// LOGIC ===========================================================================================
// cell = {
//   symbol : "A",
//   status : Status.Open,
// }

export let Status = {
  Open: "Open",
  Closed: "Closed",
  Done: "Done",
  Failed: "Failed",
  Disappear: "Disappear",
}

export let isOpen = (cell) => cell.status == Status.Open

export let isClosed = (cell) => cell.status == Status.Closed

export let isDone = (cell) => cell.status == Status.Done

export let isFailed = (cell) => cell.status == Status.Failed

export let isDisappear = (cell) => cell.status == Status.Disappear

export let isBlocking = (cell) => isOpen(cell) || isFailed(cell)

// VIEW ============================================================================================
export function View({cell, onClick}) {
  let {status, symbol} = cell
  return <div className={`cell ${classByStatus(status)}`} onClick={onClick}>
    {status == (Status.Closed || Status.Disappear) ? "" : symbol}
  </div>
}

export function classByStatus(status) {
  switch (status) {
    case Status.Failed:    return 'failed'
    case Status.Done:      return 'done'
    case Status.Open:      return 'open'
    case Status.Closed:    return 'closed'
    case Status.Disappear: return 'disappear'
  }
}