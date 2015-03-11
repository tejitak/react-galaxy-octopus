import React from 'react'
import $ from 'jquery'

export default class Pipe extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        var $pipe = $(React.findDOMNode(this.refs.pipe))
        $pipe.animate({
            right: '+=' + (this.props.canvasWidth + $pipe.width()) + 'px'
        }, this.props.pipeInterval * 2, 'linear')
    }

    render() {
        return (
            <div className="pipe" ref="pipe">
                <div style={{height: this.props.top + 'px'}} className="pipeTopHalf"></div>
                <div style={{height: this.props.bottom + 'px'}} className="pipeBottomHalf"></div>
            </div>
        )
    }
}

Pipe.defaultProps = {
    pipeInterval: 0,
    canvasWidth: 0
}