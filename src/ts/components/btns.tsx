import * as React from 'react'

interface ButtonProp<T extends React.SyntheticEvent> {
    id: string
    text: string
    handle: (e: T) => void
}

interface ButtonState<T extends React.SyntheticEvent> {

}

interface CheckBoxProp extends ButtonProp<React.ChangeEvent> {
    checkByDefault: boolean
    //handleChange: (e: React.ChangeEvent<HTMLElement>) => void
}

interface CheckBoxState extends ButtonState<React.ChangeEvent> {
    checked: boolean
}

class CheckBox extends React.Component<CheckBoxProp, CheckBoxState> {
    constructor(props) {
        super(props)
        this.state = ({ checked: this.props.checkByDefault })
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({ checked: this.state.checked ? false : true })

    }

    render() {
        return (
            <div className='checkbox'>
                <input type="checkbox"
                    checked={this.state.checked}
                    id={this.props.id}
                    value={this.props.id + '_' + this.props.text}
                    onChange={this.props.handle}
                    onDoubleClick={(e) => e.preventDefault()} />

                <label htmlFor={this.props.id} onClick={this.toggle}>{this.props.text}</label>
            </div>)
    }
}

class Button extends React.Component<ButtonProp<React.MouseEvent>, ButtonState<React.MouseEvent>> {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='button unit'>
                <input type="button"
                    id={this.props.id}
                    value={this.props.text}
                    onClick={this.props.handle}
                    onDoubleClick={(e) => e.preventDefault()} />
            </div>)
    }
}

export {
    CheckBox, Button
}