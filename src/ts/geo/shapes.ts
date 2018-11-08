import { Shape, Dot, Vector } from './geomath'
import { dis, dis_sqr, dotProduct, len, opr } from './geomath'
import { AABB } from './aabb';
export { Line, Segment, Capsule, Circle }

//fundamental
class Segment extends Shape {
    constructor(public readonly a: Dot, public readonly b: Dot) { super('Segment') }

    form(_b: Dot, _way: Vector) {
        return new Segment(_b, Dot.toDot(opr(_b, _way, (a, b) => a + b)))
    }

    length() {
        return dis(this.a, this.b)
    }

    aabb() {
        return AABB.form(this.a, this.b)
    }

    sdf(d: Dot) {
        let dis1_sqr = dis_sqr(d, this.a)
        let dis2_sqr = dis_sqr(d, this.b)
        let len_sqr = dis_sqr(this.a, this.b)
        let cos_val = (dis1_sqr - dis2_sqr + len_sqr) * (dis2_sqr - dis1_sqr + len_sqr)
        if (cos_val <= 0) {
            //Dun4 jiao3 san1 jiao3 xing2
            return Math.sqrt(Math.min(dis1_sqr, dis2_sqr))
        } else {
            return Math.abs(Line._dd(this.a, this.b).sdf(d))
        }
    }
}

class Line extends Shape {
    constructor(public readonly A: number,
        public readonly B: number,
        public readonly C: number) { super('Line') }

    sdf(d: Dot): number {
        return this.takein(d) / len({ x: this.A, y: this.B })
    }

    takein(d: Dot) {
        return this.A * d.x + this.B * d.y + this.C
    }

    static _dn(d: Dot, n: Vector): Line {
        //d : (m,n) , n : (a,b) , l : a(x-m)+b(y-n)=0
        return new Line(n.x, n.y, -dotProduct(d, n))
    }

    static _da(d: Dot, a: Vector): Line {
        //d : (m,n) , a : (a,b) , l : (x-m) / a = (y-n) / b
        return new Line(-a.y, a.x, -dotProduct(d, a))
    }

    static _dd(a: Dot, b: Dot): Line {
        return this._da(a, Vector.form(a, b))
    }

    static _dk(d: Dot, k: number): Line {
        //d : (m,n) , k , y - n = k * ( x - m )
        return this._kb(k, -k * d.y + d.x)
        //equivalent : new Line(1, -k, m * k - n)
    }

    static _kb(k: number, b: number): Line {
        //k , b , y = k * x + b
        return new Line(1, -k, b)
    }
}

//derivations
class Capsule extends Shape {
    constructor(public readonly segment: Segment,
        public readonly radius: number) { super('Capsule') }

    sdf(d: Dot) {
        return this.segment.sdf(d) - this.radius
    }

    aabb(){
        return this.segment.aabb().expand(this.radius)
    }
}

class Circle extends Shape {
    constructor(public readonly center: Dot, public readonly radius: number) { super('Circle') }

    sdf(d: Dot) {
        return this.center.sdf(d) - this.radius
    }

    aabb(){
        return this.center.aabb().expand(this.radius)
    }
}

/*
function ngon(n,r){
    let pi = 3.14
    return (x,y)=>{
        if(n<=2)
            return 1
        const angle = Math.atan2(y,x);
        const div = 2 * pi / n;
        let i = Math.floor(angle/div)
        let j = i + 0.5
        const mpr = r * Math.cos(div/2)
        let mp = new Dot(mpr * Math.cos(j * div), mpr * Math.sin(j * div))
        let line = Line._dn(mp, Vector.toVector(mp))
        return line.sdf(new Dot(x,y))
    }
}
*/
