import React from 'react'
import GameCell from './GameCell'

const style = {
    display: "flex"
}

const GameRow = props => {
    const numberOfCells = props.row.length
    return (
        <div
            style={{
                ...style,
                height: 100 / numberOfCells + "%"
            }}
        >
            {
                props.row.map(cell => (
                    <GameCell
                        numberOfCells={numberOfCells}
                        cell={cell}
                    />
                ))
            }
        </div>
    )
}

export default GameRow