import React from 'react'
import GameBoard from './GameBoard'

class Snake extends React.Component {
    constructor(props) {
        super()

        const halfBoardDimension = Math.ceil(props.boardDimension / 2) - 1
        this.intervalId = null
        this.currentGameBoard = null
        this.currentPlayerIndex = 0
        this.direction = 'right'

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
            gameTickTime: 400,
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
        this.placeNewMeal()
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
        window.removeEventListener(
            'keydown',
            this.onArrowKeyDown
        )
    }

    generateNewMealPosition = () => {
        const randomX = Math.round(Math.random() * (this.props.boardDimension - 1))
        const randomY = Math.round(Math.random() * (this.props.boardDimension - 1))

        return {
            x: randomX,
            y: randomY
        }

        //@TODO should check if there is no snake on that position
    }

    placeNewMeal = () => {
        this.setState({
            meals: this.state.meals.concat(
                this.generateNewMealPosition())
        })
    }

    gameTick = () => {
        this.checkIfMoveIsAvailable()
    }

    checkIfMealIsOnTheNextMovePosition = (newSnakeHeadPosition) => {
        const newMeals = this.state.meals.filter(
            mealPosition => (
                mealPosition.x !== newSnakeHeadPosition.x ||
                mealPosition.y !== newSnakeHeadPosition.y
            )
        )

        if (newMeals.length === this.state.meals.length) {
            this.moveSnake(newSnakeHeadPosition)
        } else {
            this.moveSnakeOnMeal(newSnakeHeadPosition)
            this.setState({
                meals: newMeals
            })
            this.generateNewMealPosition()
        }

    }

    checkIfMoveIsAvailable = () => {
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
            case 'down':
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
            this.checkIfMealIsOnTheNextMovePosition(newSnakeHeadPosition)
        } else {
            this.endGame()
        }
    }

    moveSnakeOnMeal = (newSnakeHeadPosition) => {
        const snake = this.state.snakes[this.currentPlayerIndex]
        const snakeWithNewHead = [newSnakeHeadPosition].concat(snake)

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
        clearInterval(this.intervalId)
        alert('You LOST!')
    }

    onArrowKeyDown = event => {
        switch (event.key) {
            case 'ArrowLeft':
                this.direction = 'left'
                break
            case 'ArrowRight':
                this.direction = 'right'
                break
            case 'ArrowUp':
                this.direction = 'up'
                break
            case 'ArrowDown':
                this.direction = 'down'
                break
            default:
        }
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