import React from 'react'

export default class Counter extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <span className="count">{this.props.count}</span>
    }
}

Counter.propTypes = {
    count: React.PropTypes.number
}

Counter.defaultProps = {
    count: 0
}