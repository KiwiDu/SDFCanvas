import { Matrix } from '../scimath/matrix'
import { AABB } from './aabb'
export { Shape, Pair, Dot, Vector }//Classes
export { dotProduct, dis, dis_sqr, len, opr }//utils

interface Pair {
    x: number
    y: number
}

function toPair(p: [number, number]): Pair {
    return { x: p[0], y: p[1] }
}

interface Transformation {
    transformMatrix: Matrix
    transform(m: Matrix)
    pos(): Dot
}

function len(p: Pair) {
    return Math.sqrt(p.x * p.x + p.y * p.y)
}

function dotProduct(a: Pair, b: Pair) {
    return a.x * b.x + a.y * b.y
}

function dis_sqr(a: Pair, b: Pair) {
    let dx = a.x - b.x
    let dy = a.y - b.y
    return (dx * dx + dy * dy)
}


function dis(a: Pair, b: Pair) {
    return Math.sqrt(dis_sqr(a, b))
}

function opr(a: Pair, b: Pair, op: (a: number, b: number) => number) {
    return { x: op(a.x, b.x), y: op(a.y, b.y) }
}

function transform(m: Matrix) {
    return m.inverseMatrix()
}

abstract class Shape {
    constructor(public readonly id: string) { }

    abstract sdf(d: Dot): number
    asdf(d: [number, number]): number {
        return this.sdf(new Dot(d[0], d[1]))
    }
    aabb(): AABB {
        return new AABB([-1, -1], [1, 1])
    }
}

class Dot extends Shape {
    static origin: Dot = new Dot(0, 0)

    constructor(public readonly x: number, public readonly y: number) { super('Dot') }

    sdf(d: Dot): number {
        return dis(this, d)
    }

    center(): Dot {
        return this
    }

    static toDot(p: Pair) {
        return new Dot(p.x, p.y)
    }

    aabb() {
        return new AABB([this.x - 1, this.y - 1], [this.x + 1, this.y + 1])
    }
}

class Vector {

    constructor(public readonly x: number, public readonly y: number) { }

    static form(_b: Dot, _e: Dot): Vector {
        let x = _e.x - _b.x
        let y = _e.y - _b.y
        return new Vector(x, y)
    }

    length(): number {
        return len(this)
    }

    static toVector(p: Pair): Vector {
        return new Vector(p.x, p.y)
    }
}
