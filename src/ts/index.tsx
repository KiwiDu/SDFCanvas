import { Shape, Dot, Segment, Capsule, Circle, _ } from './geo/pack';
import { Coordinate, Canvas, Context2D } from './canvas/painter'
import { Color } from './canvas/color';
import { CheckBox, Button } from './components/btns'
import { ComboX } from './components/combox'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import '../css/combox.css'
import '../css/main.css'
import '../html/index.html'

function init_canvas(cvs: Canvas): Coordinate {
	let ctx: Context2D = cvs.getContext('2d')!
	ctx.imageSmoothingEnabled = false			//pixel level rendering
	return new Coordinate(ctx, () => cvs.width, () => cvs.height)
}

function generateNewColors(len: number) {
	let colors: Color[] = []
	for (let i = 0; i < len; i++) {
		colors.push(Color.factory(() => 255 - Math.random() * 200))
	}
	return colors
}

function getCanvas(cvs_id: string): Canvas {
	return (document.getElementById(cvs_id) as Canvas)
}

function save(cvs: Canvas): void {
	let url = cvs.toDataURL()
	console.log(url)
}

function init_res() {
	console.log('resource loading...');
	let canvas = getCanvas('cvs')
	let painter = init_canvas(canvas)
	let axis = getCanvas('axis')
	let axispainter = init_canvas(axis)
	axispainter.axis()

	return {
		AxisCanvas: axis,
		AxisPainter: axispainter,
		MainCanvas: canvas,
		MainPainter: painter
	}

}

function main() {//the entry that register everything
	console.log("main loading..")

	const res = init_res()

	//react-rendering
	//let combox = new ComboX({title:'Blend Modes',options:['Normal','Screen','Multiply','Overlay']})
	//ReactDOM.render(<ComboX title='Blend Modes' options={['Normal','Screen','Multiply','Overlay']} />, document.getElementById('react-combox'))

	//behaviours
	let shape_list: Shape[] = []
	shape_list.push(new Capsule(_(_(0, 0), _(0.2, 0.1)), 0.12))
	shape_list.push(_(_(-0.5, 0), 0.12))
	shape_list.push(_(_(-0.25, 0.1), 0.25))
	//
	let color_list: Color[] = []
	color_list = generateNewColors(shape_list.length)
	//event bindings
	let saveImg = () => {
		save(res.MainCanvas)
	}

	let renewImg = () => {
		color_list = generateNewColors(shape_list.length)
		res.MainPainter.renderSDF(shape_list, color_list)
	}

	let toggleAxis = (ev: React.ChangeEvent) => {
		res.AxisCanvas.style.display = (!(ev.currentTarget as HTMLInputElement).checked) ? "" : "none"
		console.log('axis toggle');
	}

	let toggleHiRes = (ev: React.ChangeEvent) => {
		let val = (!(ev.currentTarget as HTMLInputElement).checked) ? '1000' : '400'
		res.MainCanvas.setAttribute('width', val)
		res.MainCanvas.setAttribute('height', val)
		res.MainPainter.renderSDF(shape_list, color_list)
		console.log('hi res toggle');
	}

	let changeMode = () => null

	ReactDOM.render(
		(<form id="main-form" className="col">
			<div className="row">
				<ComboX title='Blend Modes' options={['Normal', 'Screen', 'Multiply', 'Overlay']} handle={changeMode} />
				<CheckBox id='axison' text='Axis' checkByDefault={true} handle={toggleAxis} />
				<CheckBox id='res' text='Hi-Res' checkByDefault={false} handle={toggleHiRes} />
			</div>
			<div className="row">
				<Button id="save" text="Save" handle={saveImg} />
				<Button id="do" text="Do" handle={renewImg} />
			</div>
		</form>),
		document.getElementById('react-form')
	)


	//init
	res.MainPainter.renderSDF(shape_list, color_list)
}

main()