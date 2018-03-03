import React from 'react'
import { MenuItem } from 'material-ui/Menu'
import Typography from 'material-ui/Typography'
import isPartHighlighted from './is-part-highlighted'

export default function renderSuggestion(suggestion, { isHighlighted }) {
	const { theme, highlight, labelKey } = this.props
	const { item, matches } = suggestion
	const match = matches.find(item => (item.key === labelKey))

	const value = match && match.value ? match.value : item[labelKey]
	const secondaryKeys = Object.keys(item)
		.filter(i => (i !== labelKey))

	const fullWidth = { width: '100%' }

	return (
		<MenuItem component="div" style={{ backgroundColor: isHighlighted ? theme.palette.divider : 'transparent' }}>
			<div>
				<div style={fullWidth}>
					{
						!highlight ?
							(<Typography style={fullWidth}>{value}</Typography>) :
							Array.from(value, (part, i) => {
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
				</div>
				{
					secondaryKeys.length > 0 &&
					secondaryKeys.map((keyName, key) => (
						<div style={fullWidth} key={`${keyName}-${key}`}>
							<Typography variant="caption">{item[keyName]}</Typography>
						</div>
					))
				}
			</div>
		</MenuItem>
	)
}
