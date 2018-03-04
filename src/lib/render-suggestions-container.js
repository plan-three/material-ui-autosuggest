import React from 'react'
import Paper from 'material-ui/Paper'

export default function renderSuggestionsContainer(options) {
	const { containerProps, children } = options

	return (
		<Paper {...containerProps} square>
			{children}
		</Paper>
	)
}
