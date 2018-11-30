import React from 'react'
import GameBoard from './GameBoard'

class Snake extends React.Component {
    state = {
        gameBoard: Array(this.props.boardDimension)
            .fill(
                Array(this.props.boardDimension).fill(1)
            ),
        snakes: [
            [
                { x: 5, y: 5 },
                { x: 5, y: 6 }
            ],
            [
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ]
        ],
        meals: [
            { x: 2, y: 3 }
        ]
    }

    composeGameBoard = () => {
        const gameBoardCopy = JSON.parse(JSON.stringify(this.state.gameBoard)) //kopia tablicy bez zmieniania stanu

        this.state.snakes
            .forEach(snake => (
                snake.forEach(bodyCellPosition => (
                    gameBoardCopy[bodyCellPosition.y][bodyCellPosition.x] = 0
                ))
            ))

            this.state.meals.forEach(mealPosition => (
                gameBoardCopy[mealPosition.y][mealPosition.x] = 'F'
            ))

        return gameBoardCopy
    }

    render() {
        const gameBoard = this.composeGameBoard()

        return (
            <div>
                <GameBoard
                    gameBoard={gameBoard}
                />
            </div>
        )
    }
}

Snake.defaultProps = {
    // @TODO it should check if number is bigger than 5
    boardDimension: 10
}

export default Snake