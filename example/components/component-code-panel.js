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
import { docco } from 'react-syntax-highlighter/styles/hljs'

const styles = {
	root: {
		marginTop: '1em',
		flexGrow: 1
	},
	code: {
		width: '100%'
	}
}

function generateCodeContent(options) {
	return (
	// eslint-disable-next-line
`import React from 'react'
import Autosuggest from 'material-ui-autosuggest'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

const suggestions = moment.tz.names()
	.map(tz => ({ label: tz }))

const TimezoneAutosuggest = ({${Object.keys(options).map(option => `\n\t${option}, // ${typeof options[option] === 'string' ? `'${options[option].replace(/'/g, '\\\'')}'` : options[option]}`).join('')}
	...props // other props
}) => (
	<Autosuggest${Object.keys(options).map(option => {
			return `\n\t\t${option}={${option}}`
		}).join('')}
		suggestions={suggestions}
		searchKeys={['label']}
		labelKey="label"
		{...props}
	/>
)

TimezoneAutosuggest.propTypes = { /* your proptypes */ }

export default TimezoneAutosuggest

`) // eslint-disable-line
}

const ComponentCodePanel = ({ classes, options }) => {
	const content = generateCodeContent(options)

	return (
		<div className={classes.root}>
			<ExpansionPanel defaultExpanded>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="headline">Component Code</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<SyntaxHighlighter
						language="javascript"
						style={docco}
						className={classes.code}
						showLineNumbers
					>
						{content.replace(/\t/g, '    ')}
					</SyntaxHighlighter>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	)
}

ComponentCodePanel.propTypes = {
	classes: PropTypes.object.isRequired,
	options: PropTypes.object.isRequired
}

export default withStyles(styles)(ComponentCodePanel)
