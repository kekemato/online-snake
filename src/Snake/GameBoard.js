import React from 'react'

const GameBoard = props => (
    <div>
        {

            props.gameBoard.map(row => (
                <div>
                    {
                        row.map(cell => (
                            <div>
                                {cell}
                            </div>
                        ))
                    }
                </div>
            ))
        }
    </div>
)

export default GameBoard