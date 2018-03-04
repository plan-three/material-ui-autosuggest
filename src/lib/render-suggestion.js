import React from 'react'
import { MenuItem } from 'material-ui/Menu'
import Typography from 'material-ui/Typography'
import HighlightedText from '../components/highlighted-text'
import flattenObject from '../lib/flatten-object'
import Chip from 'material-ui/Chip'

export default function renderSuggestion(suggestion, { isHighlighted }) {
	const { theme, highlight, labelKey, fuzzySearchOpts } = this.props
	const { matches } = suggestion
	const item = flattenObject(suggestion.item)
	const match = matches.find(item => (item.key === labelKey))

	const value = match && match.value ? match.value : item[labelKey]
	const secondaryKeys = Object.keys(item)
		.filter(i => (i !== labelKey && ~fuzzySearchOpts.keys.indexOf(i)))

	const styles = {
		fullWidth: {
			width: '100%'
		},
		menuItem: {
			height: 'auto',
			backgroundColor: isHighlighted ? theme.palette.divider : 'transparent'
		},
		chip: {
			marginRight: theme.spacing.unit,
			marginTop: theme.spacing.unit
		}
	}

	return (
		<MenuItem component="div" style={styles.menuItem}>
			<div>
				<div style={styles.fullWidth}>
					{
						!highlight ?
							(<Typography style={styles.fullWidth}>{value}</Typography>) :
							(<HighlightedText value={value} match={match} />)
					}
				</div>
				{
					secondaryKeys.length > 0 &&
					secondaryKeys.map((keyName, key) => {
						const match = matches.find(i => (i.key === keyName))
						if (!match) return null
						const secondaryLabel = highlight ?
							(
								<Typography><HighlightedText value={item[keyName]} match={match} /></Typography>
							) :
							(
								<Typography>{item[keyName]}</Typography>
							)
						return (
							<Chip key={`${keyName}-${key}`} label={secondaryLabel} style={styles.chip} />
						)
					})
				}
			</div>
		</MenuItem>
	)
}
