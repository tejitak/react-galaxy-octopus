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
        this._pipeTimer = setInterval(this._createPipe.bind(this), props.pipeInterval);
        // space key handling
        document.body.addEventListener('keydown', (e)=>{
            var key = (window.Event) ? e.which : e.keyCode
            if(key === 32) {
                this.onClickCanvas()
            }
        })
    }

    watchPos() {
        if(this.state.phase === 'RUNNING'){
            console.log("detect...")
            var res = this.detectCollision()
            if(!res){ return true; }
            if(res.state === 'HIT'){
                // collision detected & game end
                this._fail()
            }else if(res.state === 'SUCCESS'){
                this._updateCount(res._count)
            }
            return true
        }        
    }

    // detect collision
    detectCollision() {
        var reverse = this.props.setting.reverseGravity,
            canvasH = React.findDOMNode(this.refs.canvas).offsetHeight,
            octopusPos = this.refs.octopus.getPos();
        if((octopusPos.t + octopusPos.h) === (reverse ? canvasH - octopusPos.h : 0)){
            return {state: "HIT"};
        }
        var count = this.state.count,
            pipe = this.refs[count - 1]
        if(pipe){
            var gapPos = pipe.getGapPos();
            // detect left to right range
            if((octopusPos.l + octopusPos.w) >= gapPos.l && octopusPos.l <= (gapPos.l + gapPos.w)){
                // detect bottom to top range
                if(octopusPos.t < gapPos.t || (octopusPos.t + octopusPos.h) > gapPos.t + this.props.gapHeight){
                    return {state: "HIT"};
                }
            } else if(octopusPos.l >= (gapPos.l + gapPos.w)){
                return {state: "SUCCESS", count: count};
            }
        }
    }

    // listen click and space key
    onClickCanvas() {
        switch(this.state.phase) {
            case 'INTRO':
                this.setState({phase: 'RUNNING'}, () => {
                    this._loop.start()
                })
                break;
            case 'RUNNING':
                this.refs.octopus.jump();
                // this.setState({phase: 'ENDING'})
                break;
            case 'ENDING':
                break;
        }
    }

    // create and move pipe
    _createPipe() {
        console.log("createPipe");
        var pipes = this.state.pipes,
            topHeight = Math.floor(Math.random() * (this.canvasHeight - 250)) + 50,
            bottomHeight = this.canvasHeight - (topHeight + this.props.gapHeight)
        // show at most two pipes
        if(pipes.length > 1){
            pipes.splice(0, 1)
        }
        this.setState({pipes: pipes.concat({
            id: this.state.count++,
            topHeight: topHeight,
            bottomHeight: bottomHeight,
            gapHeight: this.props.gapHeight,
            pipeInterval: this.props.pipeInterval,
            canvasWidth: this.canvasWidth
        })})
    }

    // called when successfully jumped
    _success() {

    }

    // fail to jump
    _fail() {
        this._loop.end()
        this.setState({phase: 'INTRO'})
    }

    // update counter
    _updateCount(count) {
        this.setState({count: count})
    }

    componentDidMount() {
        var canvas = React.findDOMNode(this.refs.canvas);
        this.canvasWidth = canvas.offsetWidth
        this.canvasHeight = canvas.offsetHeight
    }

    render() {
        return (
            <div className="canvas" onClick={this.onClickCanvas.bind(this)} ref="canvas">
                <Counter count="{this.state.count}"/>
                <Octopus ref="octopus" reverse={this.props.setting.reverseGravity} canvasHeight={this.canvasHeight}/>
                {this.state.pipes.map(function(pipe) {
                   return <Pipe ref={pipe.id} key={pipe.id} topHeight={pipe.topHeight} bottomHeight={pipe.bottomHeight} pipeInterval={pipe.pipeInterval} canvasWidth={pipe.canvasWidth} gapHeight={pipe.gapHeight}/>;
                })}
            </div>
        )
    }
}


Canvas.defaultProps = {
    pipeInterval: 1600,
    gapHeight: 120
}