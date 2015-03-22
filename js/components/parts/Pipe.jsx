import React from 'react'
import ReactStateAnimation from 'react-state-animation'

export default class Pipe extends React.Component {
    constructor(props) {
        super(props)
        // initialize state
        this.state = {
            right: -props.pipeWidth
        }
        // react state animation wrapper
        this._animate = new ReactStateAnimation(this)
    }

    componentDidMount() {
        this._animate.linear('right', this.props.canvasWidth, this.props.pipeInterval * 2)
    }

    componentWillUnmount() {
        this.stop()
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
        this._animate.stop()
    }

    render() {
        return (
            <div className="pipe" ref="pipe" style={{right: this.state.right + 'px'}}>
                <div style={{height: this.props.topHeight + 'px'}} className="pipeTopHalf"></div>
                <div style={{height: this.props.bottomHeight + 'px'}} className="pipeBottomHalf"></div>
            </div>
        )
    }
}

Pipe.defaultProps = {
    pipeWidth: 60,
    pipeInterval: 0,
    canvasWidth: 0,
    gapHeight: 0
}