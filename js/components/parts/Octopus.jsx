import React from 'react'
import ReactStateAnimation from 'react-state-animation'

export default class Octopus extends React.Component {
    constructor(props) {
        super(props)
        // initialize state
        this.state = {
            bottom: props.initBottom
        }
        // react state animation wrapper
        this._animate = new ReactStateAnimation(this)
    }

    getPos() {
        var octopus = React.findDOMNode(this.refs.octopus),
            box = octopus.getBoundingClientRect()
        return {
            w: octopus.offsetWidth,
            h: octopus.offsetHeight,
            t: octopus.offsetTop,
            l: box.left
        }
    }

    fall() {
        return new Promise((resolve, reject) => {
            var pos = this.getPos(),
                canvasH = this.props.canvasHeight,
                reverse = this.props.reverse,
                operator = reverse ? -1 : 1,
                distance = reverse ? pos.t : canvasH - pos.t - pos.h,
                totalFallTime = 1000/*time for fall*/ * distance / canvasH
            // rotate by css transform
            this.rotate(90 * operator)
            if(distance < 10){
                resolve()
            }else{
                this._animate
                    .stop()
                    .linear('bottom', reverse ? canvasH - pos.h : 0, totalFallTime)
                    .then(resolve)
            }
        })
    }

    jump() {
        return new Promise((resolve, reject) => {
            var distance = 60, 
                operator = this.props.reverse ? -1 : 1,
                pos = this.getPos()
            // rotate by css transform
            this.rotate(-20 * operator)
            this._animate
                .stop()
                .linear('bottom', this.state.bottom + (distance * operator), 200)
                .then(() => {
                    this.rotate(0)
                    this._animate.linear('bottom', this.state.bottom - (distance * operator), 300)
                        .then(() => {
                            this.fall().then(resolve)
                        })
                })

        })
    }

    rotate(deg) {
        var octopus = React.findDOMNode(this.refs.octopus)
        octopus.style.webkitTransform = 'rotate(' + deg + 'deg)'
        octopus.style.mozTransform = 'rotate(' + deg + 'deg)'
        octopus.style.msTransform = 'rotate(' + deg + 'deg)'
        octopus.style.oTransform = 'rotate(' + deg + 'deg)'
        octopus.style.transform = 'rotate(' + deg + 'deg)'
    }

    stop() {
        this._animate.stop()
    }

    render() {
        return <div className='octopus' ref="octopus" style={{bottom: this.state.bottom + 'px'}}></div>
    }
}

Octopus.defaultProps = {
    initBottom: 225,
    canvasHeight: 0,
    reverse: false
}