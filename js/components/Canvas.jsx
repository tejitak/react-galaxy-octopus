import React from 'react'
import Counter from './Counter'
import Octopus from './Octopus'
import Pipe from './Pipe'

export default class Canvas extends React.Component {
    constructor(props) {
        super(props)
    }

    // create main loop

    // detect collision

    // create and move pipe

    // listen click and space key

    // update counter


    render() {
        // ref to octopus
        return (
            <div className="canvas">
                <Counter />
                <Octopus />
            </div>
        )
    }
}