import React from 'react'
import Canvas from './components/Canvas'
import Setting from './components/Setting'

export default class GallaxyOctopus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            setting: {
                reverseGravity: true
            }
        };
    }

    onChangeStting(setting) {
        // set game parameter
        this.setState({ setting: setting });
    }

    render() {
        return (
            <div>
                <Canvas setting={this.state.setting} style={{cursor:'pointer'}} />
                <Setting onChangeSetting={this.onChangeStting.bind(this)} />
            </div>
        )
    }
}