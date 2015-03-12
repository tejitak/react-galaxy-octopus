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

    getGapPos() {
        var $pipe = $(React.findDOMNode(this.refs.pipe))
        return {
            w: $pipe.width(),
            h: this.props.gapHeight,
            t: this.props.topHeight,
            l: $pipe.offset().left
        }
    }

    render() {
        return (
            <div className="pipe" ref="pipe">
                <div style={{height: this.props.topHeight + 'px'}} className="pipeTopHalf"></div>
                <div style={{height: this.props.bottomHeight + 'px'}} className="pipeBottomHalf"></div>
            </div>
        )
    }
}

Pipe.defaultProps = {
    pipeInterval: 0,
    canvasWidth: 0,
    gapHeight: 0
}