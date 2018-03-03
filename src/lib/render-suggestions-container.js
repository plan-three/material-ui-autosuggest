import React from 'react'
import Paper from 'material-ui/Paper'

export default function renderSuggestionsContainer(options) {
	const { theme, fullWidth } = this.props
	const { containerProps, children } = options

	return (
		<Paper {...containerProps} style={{ width: fullWidth ? '100%' : theme.spacing.unit * 25}} square>
			{children}
		</Paper>
	)
}
