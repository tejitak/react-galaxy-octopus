import React from 'react'
import Loop from '../util/Loop'
import Counter from './parts/Counter'
import Octopus from './parts/Octopus'
import Pipe from './parts/Pipe'

export default class Canvas extends React.Component {
    constructor(props) {
        super(props)
        // setup phase INTRO, RUNNING, ENDING
        this.state = {phase: 'INTRO', pipes: [], count: 0}
        // create main loop
        this._loop = new Loop(this.watchPos.bind(this))
        // space key handling
        document.body.addEventListener('keydown', (e)=>{
            var key = (window.Event) ? e.which : e.keyCode
            if(key === 32) {
                this.onClickCanvas(e)
            }
        })
    }

    watchPos() {
        if(this.state.phase === 'RUNNING'){
            var res = this.detectCollision()
            if(!res){ return true }
            if(res.state === 'HIT'){
                // collision detected & game end
                this._fail()
            }else if(res.state === 'SUCCESS'){
                // successfully jumped
                this._updateCount(res.count)
            }
            return true
        }        
    }

    // detect collision
    detectCollision() {
        var reverse = this.props.setting.reverseGravity,
            canvasH = React.findDOMNode(this.refs.canvas).offsetHeight,
            octopusPos = this.refs.octopus.getPos()
        if(reverse ? octopusPos.t === 0 : (octopusPos.t + octopusPos.h) === canvasH){
            return {state: "HIT"}
        }
        // first pipe data
        var pipe = this.state.pipes[0]
        if(pipe){
            var gapPos = this.refs[pipe.id].getGapPos()
            // detect left to right range
            if((octopusPos.l + octopusPos.w) >= gapPos.l && octopusPos.l <= (gapPos.l + gapPos.w)){
                // detect bottom to top range
                if(octopusPos.t < gapPos.t || (octopusPos.t + octopusPos.h) > gapPos.t + gapPos.h){
                    return {state: "HIT"}
                }
            } else if(octopusPos.l >= (gapPos.l + gapPos.w)){
                return {state: "SUCCESS", count: pipe.id}
            }
        }
    }

    // listen click and space key
    onClickCanvas(e) {
        e.stopPropagation();
        e.preventDefault();
        switch(this.state.phase) {
            case 'INTRO':
                this.setState({phase: 'RUNNING', count: 0, pipes: []}, () => {
                    React.findDOMNode(this.refs.octopus).style.bottom = (this.canvasHeight / 2) + "px"
                    this._loop.start()
                    this._pipeTimer = setInterval(this._createPipe.bind(this), this.props.pipeInterval)
                    this.refs.octopus.jump()
                })
                break
            case 'RUNNING':
                this.refs.octopus.jump()
                break
            case 'ENDING':
                break
        }
    }

    // create and move pipe
    _createPipe() {
        var pipes = this.state.pipes,
            topHeight = Math.floor(Math.random() * (this.canvasHeight - 250)) + 50,
            bottomHeight = this.canvasHeight - (topHeight + this.props.gapHeight)
        // show at most two pipes
        var lastPipe = pipes[pipes.length - 1],
            lastIndex = lastPipe && lastPipe.id || 0
        if(pipes.length > 1){
            pipes.splice(0, 1)
        }
        this.setState({pipes: pipes.concat({
            id: lastIndex + 1,
            topHeight: topHeight,
            bottomHeight: bottomHeight,
            gapHeight: this.props.gapHeight,
            pipeInterval: this.props.pipeInterval,
            canvasWidth: this.canvasWidth
        })})
    }

    // fail to jump
    _fail() {
        this._loop.end()
        this.setState({phase: 'ENDING'})
        clearInterval(this._pipeTimer)
        this.refs.octopus.fall().then(() => this.setState({phase: 'INTRO'}))
        this.state.pipes.map((pipe) => { this.refs[pipe.id].stop() })
    }

    // update counter
    _updateCount(count) {
        this.setState({count: count})
    }

    componentDidMount() {
        var canvas = React.findDOMNode(this.refs.canvas)
        this.canvasWidth = canvas.offsetWidth
        this.canvasHeight = canvas.offsetHeight
    }

    render() {
        return (
            <div className="canvas" onClick={this.onClickCanvas.bind(this)} onTouchStart={this.onClickCanvas.bind(this)} ref="canvas">
                <Counter count={this.state.count} />
                <Octopus ref="octopus" reverse={this.props.setting.reverseGravity} canvasHeight={this.canvasHeight}/>
                {this.state.pipes.map(
                    (pipe) => <Pipe ref={pipe.id} key={pipe.id} topHeight={pipe.topHeight} bottomHeight={pipe.bottomHeight} pipeInterval={pipe.pipeInterval} canvasWidth={pipe.canvasWidth} gapHeight={pipe.gapHeight}/>
                )}
            </div>
        )
    }
}


Canvas.defaultProps = {
    pipeInterval: 1600,
    gapHeight: 120
}