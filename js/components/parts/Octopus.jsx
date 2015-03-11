import React from 'react'
import $ from 'jquery'

export default class Octopus extends React.Component {
    constructor(props) {
        super(props)
    }

    fall() {
        var $dfd = $.Deferred(),
            $octopus = $(React.findDOMNode(this.refs.octopus)),
            reverse = this.props.reverse,
            octopusH = $octopus.height(),
            canvasH = this.props.canvasHeight,
            octopusBottom = parseInt($octopus.css('bottom'));
        var pos = reverse ? canvasH - octopusBottom - octopusH : octopusBottom;
        var totalFallTime = 1000/*time for fall*/ * pos / canvasH;
        $octopus.stop().animate({
            bottom: reverse ? canvasH - octopusH : 0
        }, totalFallTime, 'linear', function(){
            $dfd.resolve();
        }).css('transform', 'rotate(' + (reverse ? '-' : '') + '90deg)');
        return $dfd;
    }

    jump() {
        var $octopus = $(React.findDOMNode(this.refs.octopus)),
            reverse = this.props.reverse
        $octopus.css('transform', 'rotate(' + (reverse ? '' : '-') + '20deg)').stop().animate({
            bottom: (reverse ? '-' : '+') + '=60px'
        }, 200, () => {
            $octopus.css('transform', 'rotate(0deg)').stop().animate({
                bottom: (reverse ? '+' : '-') + '=60px'
            }, 300, 'linear', () => {
                this.fall();
            })
        })
    }

    render() {
        return <div className='octopus' ref="octopus"></div>
    }
}

Octopus.defaultProps = {
    canvasHeight: 0,
    reverse: false
}