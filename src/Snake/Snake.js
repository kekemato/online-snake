import React from 'react'

class Snake extends React.Component {
    state = {
        gameBoard: Array(this.props.boardDimension)
            .fill(Array(this.props.boardDimension))
            .fill(1)
    }

    render() {
        return (
            <div>
                Snake
            </div>
        )
    }
}

Snake.defaultProps = {
    boardDimension: 10
}

export default Snake