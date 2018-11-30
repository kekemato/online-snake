import React from 'react'

class Snake extends React.Component {
    state = {
        gameBoard: Array(this.props.boardDimension)
            .fill(
                Array(this.props.boardDimension).fill(1)
            )
    }

    render() {
        const gameBoard = JSON.parse(JSON.stringify(this.state.gameBoard)) //kopia tablicy bez zmieniania stanu

        return (
            <div>
                {
                    gameBoard.map(row => (
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
    }
}

Snake.defaultProps = {
    // @TODO it should check if number is bigger than 5
    boardDimension: 10
}

export default Snake