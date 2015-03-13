import React from 'react'
import $ from 'jquery'

export default class Pipe extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        var pipe = React.findDOMNode(this.refs.pipe),
            $pipe = $(pipe)
        $pipe.animate({
            right: '+=' + (this.props.canvasWidth + pipe.offsetWidth) + 'px'
        }, this.props.pipeInterval * 2, 'linear')
    }

    getGapPos() {
        var pipe = React.findDOMNode(this.refs.pipe),
            box = pipe.getBoundingClientRect()
        return {
            w: pipe.offsetWidth,
            h: this.props.gapHeight,
            t: this.props.topHeight,
            l: box.left
        }
    }

    stop() {
        $(React.findDOMNode(this.refs.pipe)).stop()
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