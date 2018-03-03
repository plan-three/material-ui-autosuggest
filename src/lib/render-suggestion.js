import React from 'react'
import { MenuItem } from 'material-ui/Menu'
import isPartHighlighted from './is-part-highlighted'

export default function renderSuggestion(suggestion, { isHighlighted }) {
	const { theme, highlight } = this.props
	const { item, match } = suggestion
	const itemMatch = item[match.key]

	return (
		<MenuItem component="div" style={{ backgroundColor: isHighlighted ? theme.palette.divider : 'transparent' }}>
			{
				!highlight ?
					itemMatch :
					Array.from(itemMatch, (part, i) => {
						if (part === ' ') {
							return (<span key={String(i)} dangerouslySetInnerHTML={{__html: '&nbsp;'}} />)
						}
						const highlight = isPartHighlighted(i, match)
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
