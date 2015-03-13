import React from 'react'
import $ from 'jquery'

export default class Octopus extends React.Component {
    constructor(props) {
        super(props)
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
            var octopus = React.findDOMNode(this.refs.octopus),
                $octopus = $(octopus),
                reverse = this.props.reverse,
                octopusH = this.getPos().h,
                canvasH = this.props.canvasHeight,
                octopusBottom = parseInt(octopus.style.bottom)
            var distance = reverse ? canvasH - octopusBottom - octopusH : octopusBottom
            var totalFallTime = 1000/*time for fall*/ * distance / canvasH
            $octopus.stop().animate({
                bottom: reverse ? canvasH - octopusH : 0
            }, totalFallTime, 'linear', () => {
                resolve()
            }).css('transform', 'rotate(' + (reverse ? '-' : '') + '90deg)')
        })
    }

    jump() {
        return new Promise((resolve, reject) => {
            var $octopus = $(React.findDOMNode(this.refs.octopus)),
                reverse = this.props.reverse
            $octopus.css('transform', 'rotate(' + (reverse ? '' : '-') + '20deg)').stop().animate({
                bottom: (reverse ? '-' : '+') + '=60px'
            }, 200, () => {
                $octopus.css('transform', 'rotate(0deg)').stop().animate({
                    bottom: (reverse ? '+' : '-') + '=60px'
                }, 300, 'linear', () => {
                    this.fall().then(resolve)
                })
            })
        })
    }

    stop() {
        $(React.findDOMNode(this.refs.octopus)).stop()
    }

    render() {
        return <div className='octopus' ref="octopus"></div>
    }
}

Octopus.defaultProps = {
    canvasHeight: 0,
    reverse: false
}