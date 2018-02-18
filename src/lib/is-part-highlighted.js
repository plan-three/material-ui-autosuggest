const isPartHighlighted = (i, matches) => {
	if (!matches.hasOwnProperty('indices')) return false
	const res = matches.indices.reduce((acc, val) => {
		if (!Array.isArray(val) || val.length !== 2) return acc
		if (i >= val[0] && i <= val[1]) {
			return acc + 1
		}
		return acc
	}, 0)

	return res > 0
}

export default isPartHighlighted
