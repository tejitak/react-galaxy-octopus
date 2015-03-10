import React from 'react'

export default class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {count: props.initialCount};
    }

    render() {
        return <span className="count">{this.state.count}</span>
    }
}

Counter.propTypes = {
    initialCount: React.PropTypes.number
};

Counter.defaultProps = {
    initialCount: 0
};