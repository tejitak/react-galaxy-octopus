import React from 'react'

export default class Setting extends React.Component {
    constructor(props) {
        super(props)
    }

    onChangeStting() {
        this.props.onChangeStting(this.props.setting)
    }

    render() {
        return (
            <div className='settings'>
                <div><input type='checkbox' /><label>Reverse gravity</label></div>
            </div>
        )
    }
};

Setting.defaultProps = {
    setting: {
        reverseGravity: false
    }
}