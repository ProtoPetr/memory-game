import * as React from "react"

// LOGIC ===========================================================================================
// cell = {
//   symbol : "A",
//   status : Status.Open,
// }

export enum Status {
  Open, Closed, Done, Failed, Disappear
}

export type Cell = {
  symbol : String
  status : Status
}

export type PredFn = (cell : Cell) => boolean

export let isOpen = (cell : Cell) : boolean => (
    cell.status == Status.Open
)

export let isClosed = (cell : Cell) : boolean => (
    cell.status == Status.Closed
)

export let isDone = (cell : Cell) : boolean => (
    cell.status == Status.Done
)

export let isFailed = (cell : Cell) : boolean => (
    cell.status == Status.Failed
)

export let isDisappear = (cell : Cell) : boolean => (
    cell.status == Status.Disappear
)

export let isBlocking = (cell : Cell) : boolean => (
    isOpen(cell) || isFailed(cell)
)

// VIEW ============================================================================================
type CellViewProps = {
  cell : Cell,
  onClick : (event : React.MouseEvent) => void,
}

export let View : React.FC<CellViewProps> = ({cell, onClick}) => {
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

export function statusToBackground(status : Status) : String {
  switch (status) {
    case Status.Closed: return "#a9a9a9"
    case Status.Open:   return "#dcdcdc"
    case Status.Done:   return "#a8db8f"
    case Status.Failed: return "#db8f8f"
    case Status.Disappear: return "#ffffff"
  }
}