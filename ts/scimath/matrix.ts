/* Unit test passed on 18/10/05
let a = Matrix.rotate(1).multiplyMatrix(Matrix.translate(0.2,-0.3))
////a=Matrix.translate(10,-20)
console.log('ori:\n'+a)
////console.log('multi&divide:\n'+a.multiplyNumber(2)+'\n\n'+a.divideByNumber(2))
console.log('inverse:\n'+a.inverseMatrix())
console.log('invertwice:\n'+a.inverseMatrix().inverseMatrix())
console.log('product:\n'+a.multiplyMatrix(a.inverseMatrix()) )
*/
export class Matrix {
    data: Float64Array
    static Unit: Matrix = new Matrix(
        1, 0, 0,
        0, 1, 0,
        0, 0, 1)
    constructor(a1: number, a2: number, a3: number, b1: number, b2: number, b3: number, c1: number, c2: number, n3: number) {
        this.data = new Float64Array(9)
        for (let i = 0; i < 9; i++) {
            this.data[i] = arguments[i]
        }
    }

    static make(nums: Float64Array) {
        const vals = new Float64Array(9)
        for (let i = 0; i < 9; i++) {
            vals[i] = i < nums.length ? nums[i] : 0;
        }
        return new Matrix(vals[0], vals[1], vals[2], vals[3], vals[4], vals[5], vals[6], vals[7], vals[8])
    }

    static translate(dx: number, dy: number): Matrix {
        return new Matrix(1, 0, 0,
            0, 1, 0,
            dx, dy, 1);
    }

    static rotate(angle: number): Matrix {
        return new Matrix(Math.cos(angle), -Math.sin(angle), 0,
            Math.sin(angle), Math.cos(angle), 0,
            0, 0, 1);
    }

    static zoom(ratio: number): Matrix {
        return new Matrix(ratio, 0, 0,
            0, ratio, 0,
            0, 0, 1);
    }

    det/* erminant */(): number {
        //11*22*33 + 12*23*31 + 13*21*32  -  13*22*31 - 11*23*32 - 12*21*33
        return this.pos(0, 0) * this.pos(1, 1) * this.pos(2, 2)
            + this.pos(0, 1) * this.pos(1, 2) * this.pos(2, 0)
            + this.pos(0, 2) * this.pos(1, 0) * this.pos(2, 1)
            - this.pos(0, 2) * this.pos(1, 1) * this.pos(2, 0)
            - this.pos(0, 0) * this.pos(1, 2) * this.pos(2, 1)
            - this.pos(0, 1) * this.pos(1, 0) * this.pos(2, 2)
    }

    inverseMatrix(): Matrix {
        console.log('det : ' + this.det())
        return this.adjugateMatrix().divideByNumber(this.det())
    }

    transposeMatrix(): Matrix {
        return new Matrix(this.pos(0, 0), this.pos(1, 0), this.pos(2, 0),
            this.pos(0, 1), this.pos(1, 1), this.pos(2, 1),
            this.pos(0, 2), this.pos(1, 2), this.pos(2, 2))
    }

    minor(r: number, c: number): number {
        let result = new Float64Array(4)
        let k = 0
        for (let i = 0; i < 3; i++) {
            if (i == r) { continue }

            for (let j = 0; j < 3; j++) {
                if (j == c) { continue }

                result[k] = this.pos(i, j)
                k++
            }
        }
        console.log('minor :  [ ' + result.toString() + ' ] ')
        //11*22 - 12*21
        //[0,1
        // 2,3]
        return result[0] * result[3] - result[1] * result[2]
    }

    cofactor(r: number, c: number) {
        let sign = r + c
        return this.minor(r, c) * (sign % 2 == 1 ? -1 : 1)
    }


    adjugateMatrix(): Matrix {
        return new Matrix(this.cofactor(0, 0), this.cofactor(1, 0), this.cofactor(2, 0),
            this.cofactor(0, 1), this.cofactor(1, 1), this.cofactor(2, 1),
            this.cofactor(0, 2), this.cofactor(1, 2), this.cofactor(2, 2))
    }

    add(tgt: Matrix) {
        let result = new Float64Array(9)
        for (let i = 0; i < 9; i++) {
            result[i] = this.data[i] + tgt.data[i]
        }
    }

    multiplyMatrix(tgt: Matrix): Matrix {
        let result = new Float64Array(9)
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                result[i * 3 + j] = Matrix.dotProduct(this.row(i), tgt.col(j))
            }
        }
        //console.log(result.toString())
        return Matrix.make(result)
    }

    multiplyNumber(num: number): Matrix {
        return Matrix.make(this.data.map(ele => ele * num))
    }

    divideByNumber(num: number): Matrix {
        return Matrix.make(this.data.map(ele => ele / num))
    }

    row(n: number): [number, number, number] {
        return [this.data[3 * n], this.data[3 * n + 1], this.data[3 * n + 2]]
    }

    col(n: number): [number, number, number] {
        return [this.data[n], this.data[3 + n], this.data[6 + n]]
    }

    pos(r: number, c: number) {
        return this.data[r * 3 + c];
    }

    private static dotProduct(a: [number, number, number], b: [number, number, number]): number {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }

    toString(): string {
        return '[' + this.row(0) + '\n' + this.row(1) + '\n' + this.row(2) + ']'
    }
}
