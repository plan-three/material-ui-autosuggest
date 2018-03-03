const isPartHighlighted = (i, match) => {
	if (!match || !match.hasOwnProperty('indices')) return false
	const res = match.indices.reduce((acc, val) => {
		if (!Array.isArray(val) || val.length !== 2) return acc
		if (i >= val[0] && i <= val[1]) {
			return acc + 1
		}
		return acc
	}, 0)

	return res > 0
}

export default isPartHighlighted
