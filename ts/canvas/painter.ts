import { Shape, _ } from '../geo/pack';
import { range, threshold } from '../scimath/utils'
import { Color, blend_pixel, BlendMode } from './color'
export { Coordinate, Canvas, Context2D }
type Canvas = HTMLCanvasElement
type Context2D = CanvasRenderingContext2D
class Coordinate {
    constructor(private ctx: Context2D,
        public readonly width: ()=>number,
        public readonly height: ()=>number) { }
    //Regularize the coordinate 
    /*
    @----------->x (0,width)	  => 	  	    y (-1,1)
    |							  	    		^
    |							 	 	        |
    |								 		   	|
    |								 	--------@------>x (-1,1)
    v								 	 	    |
    y (0,height)					 	   		|
    */

    axis() {
        const [w, h] = [this.width(), this.height()]

        this.ctx.fillStyle = '#e51c23'
        this.ctx.fillRect(Math.floor(w * 0.5) - 1, 0, 2, h)  //y
        this.ctx.fillRect(0, Math.floor(h * 0.5) - 1, w, 2)  //x

        const [weight, length, step] = [1, 0.005, 20]
        for (let i = 0; i <= step; i++) {
            this.ctx.fillRect(Math.floor(w * (0.5 - length)), Math.floor(i * (h / step) - weight / 2),
                Math.floor(w * 2 * length), weight)  //y
            this.ctx.fillRect(Math.floor(i * (w / step) - weight / 2), Math.floor(h * (0.5 - length)),
                weight, Math.floor(h * 2 * length))  //x
        }
    }

    private toRelXY(absXY: [number, number]): [number, number] {
        const [absX, absY] = absXY
        return [this.toRelX(absX), this.toRelY(absY)]
    }

    private toRelX(absX: number): number {
        const half_w = this.width() * 0.5
        return (absX - half_w) / half_w
    }

    private toRelY(absY: number): number {
        const half_h = this.height() * 0.5
        return (half_h - absY) / half_h
    }

    private toAbsXY(relXY: [number, number]): [number, number] {
        const [relX, relY] = relXY
        const [half_w, half_h] = [this.width() * 0.5, this.height() * 0.5]
        return [(relX * half_w) + half_w, half_h - (half_h * relY)]
    }

    renderSDF(shapes: Shape[]) {
        const [w, h] = [this.width(), this.height()]

        let data = this.ctx.getImageData(0, 0, w, h)
        let pixels = data.data
        pixels.fill(255)
        for (let shape of shapes) {
            console.log(shape)
            let [minX, minY] = this.toAbsXY(shape.aabb().min)
            let [maxX, maxY] = this.toAbsXY(shape.aabb().max)
            minX = Math.floor(minX)
            minY = Math.floor(minY)
            maxX = Math.ceil(maxX)
            maxY = Math.ceil(maxY)
            let x, y
            let color = new Color(Math.random()*255, Math.random()*255, Math.random()*255)
            for (let absY = maxY; absY < minY; absY++) {
                y = this.toRelY(absY)
                for (let absX = minX; absX < maxX; absX++) {
                    x = this.toRelX(absX)
                    let ret = shape.sdf(_(x, y))
                    ret = 1 - threshold(-0.001, 0.001, ret)		//calculate

                    blend_pixel(pixels, absY * w + absX,
                        color,ret,
                        BlendMode.Multiply
                    )
                }
            }
        }
        this.ctx.putImageData(data, 0, 0)
    }
}