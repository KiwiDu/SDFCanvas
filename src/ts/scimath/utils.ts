function range(btm: number, top: number, val: number) {
	return Math.max(btm, Math.min(val, top))
}

function threshold(x1: number, x2: number, val: number): number {
	val = (val - x1) / (x2 - x1)
	val = range(0, 1, val)
	return val
}

export {range,threshold}