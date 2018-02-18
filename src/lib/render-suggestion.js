import React from 'react'
import { MenuItem } from 'material-ui/Menu'
import isPartHighlighted from './is-part-highlighted'

export default function renderSuggestion(suggestion, { isHighlighted }) {
	const { theme, labelKey, highlight } = this.props
	const { item, matches } = suggestion

	return (
		<MenuItem component="div" style={{ backgroundColor: isHighlighted ? theme.palette.divider : 'transparent' }}>
			{
				!highlight ?
					item[labelKey] :
					Array.from(item[labelKey], (part, i) => {
						const highlight = isPartHighlighted(i, matches[0])
						const fontWeight = highlight ? 500 : 300
						return (
							<span key={String(i)} style={{ fontWeight }}>
								{part}
							</span>
						)
					})
			}

		</MenuItem>
	)
}
