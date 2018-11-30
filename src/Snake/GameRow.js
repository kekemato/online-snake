import React from 'react'
import GameCell from './GameCell'

const style = {
    display: "flex"
}

const GameRow = props => (
    <div
        style={style}
    >
        {
            props.row.map(cell => (
                <GameCell
                    numberOfCells = {props.row.length}
                    cell={cell}
                />
            ))
        }
    </div>
)

export default GameRow