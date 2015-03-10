import React from 'react'
import Loop from '../Loop'
import Counter from './Counter'
import Octopus from './Octopus'
import Pipe from './Pipe'

export default class Canvas extends React.Component {
    constructor(props) {
        super(props)
        // setup phase INTRO, RUNNING, ENDING
        this.state = {phase: 'INTRO', pipes: []}
        // create main loop
        this._loop = new Loop(this.watchPos.bind(this))
        this._pipeTimer = setInterval(this._createPipe.bind(this), 1000);
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
        return {state: 'HIT'}
    }

    // listen click and space key
    onClickCanvas(e) {
        switch(this.state.phase) {
            case 'INTRO':
                this.setState({phase: 'RUNNING'}, () => {
                    this._loop.start()
                })
                break;
            case 'RUNNING':
                this.refs.octopus.jump();
                // temp
                this.setState({phase: 'ENDING'})
                break;
            case 'ENDING':
                break;
        }
    }

    // create and move pipe
    _createPipe() {
        console.log("createPipe");
        this.state.pipes.push({id: 1, top: 10, gap: 200});
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
        this.refs.counter.update(count);
    }

    render() {
        // ref to octopus
        return (
            <div className="canvas" onClick={this.onClickCanvas.bind(this)}>
                <Counter ref="counter"/>
                <Octopus ref="octopus"/>
                {this.state.pipes.map(function(pipe) {
                   return <Pipe key={pipe.id} top={pipe.top} gap={pipe.gap}/>;
                })}
            </div>
        )
    }
}