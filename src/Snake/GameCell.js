import React from 'react'

const style = {
    display: "flex",
    justifyContent: "center"
}

const GameCell = props => (
    <div
        style={{
            ...style,
            flexBasis: 100 /props.numberOfCells + "%"
        }}
    >
        {props.cell}
    </div>
)

export default GameCell