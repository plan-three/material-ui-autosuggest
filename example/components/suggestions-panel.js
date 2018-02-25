import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ExpansionPanel, {
	ExpansionPanelSummary,
	ExpansionPanelDetails
} from 'material-ui/ExpansionPanel'
import { Typography } from 'material-ui'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { hybrid, docco } from 'react-syntax-highlighter/styles/hljs'

const styles = {
	root: {
		marginTop: '1em',
		flexGrow: 1
	},
	code: {
		width: '100%'
	}
}

const SuggestionsPanel = ({ classes, suggestions, themeType }) => {
	const hasSuggestions = !!suggestions.length
	const code = hasSuggestions ? JSON.stringify(suggestions, null, 2) : '[\n  // suggestions \n]'
	return (
		<div className={classes.root}>
			<ExpansionPanel defaultExpanded>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="headline">Most Recent Suggestions</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<SyntaxHighlighter
						language={hasSuggestions ? 'json' : 'javascript'}
						style={themeType === 'light' ? docco : hybrid}
						className={classes.code}
					>
						{code}
					</SyntaxHighlighter>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	)
}

SuggestionsPanel.propTypes = {
	classes: PropTypes.object.isRequired,
	suggestions: PropTypes.array.isRequired
}

export default withStyles(styles)(SuggestionsPanel)
