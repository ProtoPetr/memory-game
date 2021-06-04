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
  return <>
    <div className="cell" onClick={onClick}>
      {status == (Status.Closed) ? "" : symbol}
    </div>
    <style jsx>{`
      .cell {
        font-size: 4rem;
        background: gray;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100px;
        background: ${statusToBackground(status)};
        transition: 0.5s ease-out;
        cursor: ${status == Status.Closed ? "pointer" : "auto"};
        color: ${status == Status.Disappear ? "#ffffff" : "auto"};
        transform: ${status == Status.Closed ? "rotateY(-180deg)" : "rotateY(0deg)"};
      }
    `}</style>
  </>
}

export function statusToBackground(status) {
  switch (status) {
    case Status.Closed: return "#a9a9a9"
    case Status.Open:   return "#dcdcdc"
    case Status.Done:   return "#a8db8f"
    case Status.Failed: return "#db8f8f"
    case Status.Disappear: return "#ffffff"
  }
}