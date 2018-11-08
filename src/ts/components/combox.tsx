import * as React from 'react'
//import * as ReactDOM from 'react-dom'
//import * as CSSModules from 'react-css-modules'

type toEle = (string) => HTMLElement
type creEle = <K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions) => HTMLElementTagNameMap[K]
let $: toEle = (a: string) => document.querySelector(a)
let _: creEle = (a) => document.createElement(a)

interface ComboProp {
    title: string
    options: string[]
    handle:(str:string,e:React.MouseEvent<HTMLElement>)=>void
}

interface ComboState {
    selected: string
    expansion: boolean
}

class ComboX extends React.Component<ComboProp, ComboState>{
    constructor(props: ComboProp) {
        super(props)
        this.state = { selected: this.props.title, expansion: false }
        
        this.itemClicked = this.itemClicked.bind(this)
        this.boxClicked = this.boxClicked.bind(this)
    }

    itemClicked(e: React.MouseEvent<HTMLLIElement>) {
        let cur = e.currentTarget.innerHTML
        this.setState({
            selected: e.currentTarget.innerHTML,
            expansion: false
        })
        if(this.state.selected==cur){

        }else{
            this.props.handle(cur,e)
        }
        
    }

    boxClicked() {
        this.setState({
            //selected:this.innerHTML
            expansion: !(this.state.expansion)
        })
    }

    render() {
        //let box = this
        let option_items =
            this.props.options.map(
                (str, i) =>
                    <li className={i % 2 == 0 ? 'even' : 'odd'} key={i} onClick={this.itemClicked}>{str}</li>
            )
        let list = null
        if (this.state.expansion) {
            list = <ul className='row'>{option_items}</ul>
        }
        
        return <div className={'combox ' + (this.state.expansion ? 'expanded' : 'collapsed')} onClick={this.boxClicked}>
            <input id='selection' type='hidden' value={this.state.selected}></input>
            <p>{this.state.selected}</p>
            {list}
        </div>
    }
}
export{ ComboX }
/* 
let main = () => {
    let title = 'ComboBox-ComboX'
    let cons = ['option1', 'nullopt','averyveryveylooooooooooooongoptionishere', 'opt-in', 'opt-out']
    ReactDOM.render(<ComboX title={title} options={cons} />, $('#con'))
} */