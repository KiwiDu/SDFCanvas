import { range, threshold } from '../scimath/utils'
export { Color, BlendMode, ChannelData, fill_pixel, blend_pixel }

class Color {

    constructor(public readonly R: number,
        public readonly G: number,
        public readonly B: number) { }

    public valid(): boolean {
        return this.R > 0 && this.G > 0 && this.B > 0
    }

    static Empty: Color = new Color(-1, -1, -1)

    public static factory(opr: () => number): Color {
        return new Color(opr(), opr(), opr())
    }
}

type ChannelData = Uint8ClampedArray
type reduce<T> = (a: T, b: T) => T

/* function fromHex(hex:string){
    let reg=/#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/
    let ret = hex.match(reg)
    let res = ret![0]
    return res
} */

function fill_pixel(data: ChannelData, i: number, color: Color): void {
    data[4 * i] = color.R
    data[4 * i + 1] = color.G
    data[4 * i + 2] = color.B
    data[4 * i + 3] = 255
}

class BlendMode {
    static Normal(a: number, b: number) {
        return b;
    }

    static Multiply(a: number, b: number) {
        return a * b / 255
    }

    static Screen(a: number, b: number) {
        return 255 - (255 - a) * (255 - b) / 255
    }

    static Overlay(a: number, b: number) {
        if (a < 0.5 * 255) {
            return 2 * a * b / 255
        } else {
            return 255 - 2 * (255 - a) * (255 - b) / 255
        }
    }
}

function blend_pixel(data: ChannelData, i: number, color: Color, alpha: number, opr: reduce<number>): void {
    if (!color.valid()) { return }

    let op = (a, b) => range(0, 255, opr(a, b))
    let c = [color.R, color.G, color.B]
    for (let j = 0; j < 3; j++) {
        let result = op(data[4 * i], c[j])
        data[4 * i + j] *= (1 - alpha)
        data[4 * i + j] += result * alpha
    }
    data[4 * i + 3] = 255
}
