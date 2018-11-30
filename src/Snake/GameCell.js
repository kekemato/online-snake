import React from 'react'

const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const GameCell = (props) => {
    const color = (
        props.cell === 0 ?
            'black'
            :
            props.cell === 'F' ?
                'green'
                :
                'white'
    )
    return (
        <div
            style={{
                ...style,
                flexBasis: 100 / props.numberOfCells + '%',
                backgroundColor: color
            }}
        >
        </div>
    )
}

export default GameCell