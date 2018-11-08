import { Dot } from "./geomath";

export class AABB {
    constructor(public readonly min: [number, number], public readonly max: [number, number]) {
        min[0] = Math.max(min[0], -1)
        min[1] = Math.max(min[1], -1)
        max[0] = Math.min(max[0], 1)
        max[1] = Math.min(max[1], 1)
    }
    expand(d: number) {
        return new AABB(
            [this.min[0] - d, this.min[1] - d], [this.max[0] + d, this.max[1] + d])
    }

    static form(a: Dot, b: Dot) {
        let [minx, maxx, miny, maxy] = [a.x, b.x, a.y, b.y]
        if (minx > maxx) {
            [minx, maxx] = [maxx, minx]
        }
        if (miny > maxy) {
            [miny, maxy] = [maxy, miny]
        }
        return new AABB([minx - 1, miny - 1], [maxx + 1, maxy + 1])
    }
}