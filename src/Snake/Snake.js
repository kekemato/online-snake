import React from 'react'
import GameBoard from './GameBoard'

class Snake extends React.Component {
    constructor(props) {
        super()

        const halfBoardDimension = Math.ceil(props.boardDimension / 2) - 1
        this.intervalId = null
        this.currentGameBoard = null
        this.currentPlayerIndex= 0
        this.direction ='right'

            this.state = {
                gameBoard: Array(props.boardDimension)
                    .fill(
                        Array(props.boardDimension).fill(1)
                    ),
                snakes: [
                    [
                        { x: halfBoardDimension + 2, y: halfBoardDimension },
                        { x: halfBoardDimension + 1, y: halfBoardDimension }
                    ],
                    [
                        { x: halfBoardDimension - 2, y: halfBoardDimension },
                        { x: halfBoardDimension - 1, y: halfBoardDimension }
                    ]
                ],
                meals: [],
                gameTickTime: 1000,
            }
    }

    componentDidMount() {
        this.intervalId = setInterval(
            this.gameTick,
            this.state.gameTickTime
        )
        window.addEventListener(
            'keydown',
            this.onArrowKeyDown
        )
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
        window.removeEventListener(
            'keydown',
            this.onArrowKeyDown
        )
    }

    gameTick = () => {
        this.checkIfMovesAreAvailable()
    }

    checkIfMovesAreAvailable = () => {
        const snakeHeadPosition = this.state.snakes[this.currentPlayerIndex][0]
        let newSnakeHeadPosition = null
        switch (this.direction) {
            case 'left':
                newSnakeHeadPosition = {
                    x: snakeHeadPosition.x - 1,
                    y: snakeHeadPosition.y
                }
                break
            case 'right':
                newSnakeHeadPosition = {
                    x: snakeHeadPosition.x + 1,
                    y: snakeHeadPosition.y
                }
                break
            case 'up':
                newSnakeHeadPosition = {
                    x: snakeHeadPosition.x,
                    y: snakeHeadPosition.y - 1
                }
                break
            case 'bottom':
                newSnakeHeadPosition = {
                    x: snakeHeadPosition.x,
                    y: snakeHeadPosition.y + 1
                }
                break
            default:
        }
        if (
            this.currentGameBoard[newSnakeHeadPosition.y] &&
            this.currentGameBoard[newSnakeHeadPosition.y][newSnakeHeadPosition.x]
        ) {
            this.moveSnake(newSnakeHeadPosition)
        } else {
            this.endGame()
        }
    }

    moveSnake = (newSnakeHeadPosition) => {
        const snake = this.state.snakes[this.currentPlayerIndex]
        const snakeWithoutTail = snake.slice(0, -1)
        const snakeWithNewHead = [newSnakeHeadPosition].concat(snakeWithoutTail)

        const newSnakes = this.state.snakes.map((snake, i) => (
            this.currentPlayerIndex === i ?
                snakeWithNewHead
                :
                snake
        ))

        this.setState({
            snakes: newSnakes
        })
    }

    endGame = () => {
        alert('LOST!')
    }

    onArrowKeyDown = event => {
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'ArrowUp':
            case 'ArrowDown':
            default:
        }
        // this.setState({direction: event})
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
        this.currentGameBoard = this.composeGameBoard()

        return (
            <div>
                <GameBoard
                    gameBoard={this.currentGameBoard}
                />
            </div>
        )
    }
}

Snake.defaultProps = {
    // @TODO it should check if number is bigger than 5
    boardDimension: 10,
    gameTickTime: 1000
}

export default Snake