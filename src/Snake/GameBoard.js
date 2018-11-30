import React from 'react'
import GameRow from './GameRow'

const style = {
    width: "100wv",
    maxWidth: "700px",
    height: "100vw",
    maxHeight: "700px",
    margin: "0 auto",
    border: "1px solid black"
}

const GameBoard = props => (
    <div
        style={style}>
        {

            props.gameBoard.map(row => (
                <GameRow
                    row={row}
                />
            ))
        }
    </div>
)

export default GameBoard