import { Shape, Dot, Segment, Capsule, Circle, _ } from './geo/pack';
import { Coordinate, Canvas, Context2D } from './canvas/painter'

function init_canvas(cvs: Canvas): Coordinate {
	const w = cvs.width,
		h = cvs.height
	let ctx: Context2D = cvs.getContext('2d')!
	ctx.imageSmoothingEnabled = false			//pixel level rendering
	return new Coordinate(ctx, w, h)
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

	//behaviours
	let shape_list: Shape[] = []
	shape_list.push(new Capsule(_(_(0, 0), _(0.2, 0.1)), 0.12))
	shape_list.push(_(_(-0.5, 0), 0.12))
	shape_list.push(_(_(-0.25, 0.1), 0.25))

	//event bindings
	let savebtn = document.getElementById('save')
	savebtn!.addEventListener('click', () => {
		save(canvas)
	})

	let dobtn = document.getElementById('do')
	dobtn!.addEventListener('click', () => {
		painter.renderSDF(shape_list)
	})

	let axisCkBx = <HTMLInputElement>document.getElementById('axis')
	axisCkBx!.addEventListener('change',(ev)=>painter.axison = (axisCkBx!.checked))

	//init
	painter.renderSDF(shape_list)
}

main()