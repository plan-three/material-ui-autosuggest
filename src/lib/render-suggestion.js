import React from 'react'
import { MenuItem } from 'material-ui/Menu'
import Typography from 'material-ui/Typography'
import HighlightedText from '../components/highlighted-text'

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
							(<HighlightedText value={value} match={match} />)
					}
				</div>
				{
					secondaryKeys.length > 0 &&
					secondaryKeys.map((keyName, key) => {
						const match = matches.find(i => (i.key === keyName))
						const secondaryLabel = highlight && match ?
							(
								<Typography variant="caption"><HighlightedText value={item[keyName]} match={match} /></Typography>
							) :
							(
								<Typography variant="caption">{item[keyName]}</Typography>
							)
						return (
							<div style={fullWidth} key={`${keyName}-${key}`}>{secondaryLabel}</div>
						)
					})
				}
			</div>
		</MenuItem>
	)
}
