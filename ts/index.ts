import { Shape, Dot, Segment, Capsule, Circle, _ } from './geo/pack';
import { Coordinate, Canvas, Context2D } from './canvas/painter'
import { Color } from './canvas/color';

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
	return <Canvas>document.getElementById(cvs_id)
}

function save(cvs: Canvas): void {
	let url = cvs.toDataURL()
	console.log(url)
}

function main() {//the entry that register everything
	console.log("main loaded")

	let canvas = getCanvas('cvs')
	let painter = init_canvas(canvas)
	let axis = getCanvas('axis')
	let axispainter = init_canvas(axis)
	axispainter.axis()

	//behaviours
	let shape_list: Shape[] = []
	shape_list.push(new Capsule(_(_(0, 0), _(0.2, 0.1)), 0.12))
	shape_list.push(_(_(-0.5, 0), 0.12))
	shape_list.push(_(_(-0.25, 0.1), 0.25))
	//
	let color_list: Color[] = []
	color_list = generateNewColors(shape_list.length)
	//event bindings
	let saveBtn = document.getElementById('save')
	saveBtn!.addEventListener('click', () => {
		save(canvas)
	})

	let doBtn = document.getElementById('do')
	doBtn!.addEventListener('click', () => {
		color_list = generateNewColors(shape_list.length)
		painter.renderSDF(shape_list, color_list)
	})

	let axisCkBx = <HTMLInputElement>document.getElementById('axison')
	axisCkBx.checked = true
	axisCkBx!.addEventListener('change', (ev) => {
		axis.style.display = (axisCkBx!.checked) ? "" : "none"
	})

	let resCkBx = <HTMLInputElement>document.getElementById('res')
	resCkBx!.addEventListener('change', (ev) => {
		let val = (resCkBx!.checked) ? '800' : '400'
		canvas.setAttribute('width', val)
		canvas.setAttribute('height', val)
		painter.renderSDF(shape_list, color_list)
	})

	/* let colorBand=document.getElementById('colors')
	for (let i = 0; i < colorBand!.childElementCount; i++) {
		let c = (colorBand!.children[i]);
		(<HTMLDivElement>c).style.backgroundColor="#555"
	} */

	//init
	painter.renderSDF(shape_list, color_list)
}

main()