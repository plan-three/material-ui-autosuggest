import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ExpansionPanel, {
	ExpansionPanelSummary,
	ExpansionPanelDetails
} from 'material-ui/ExpansionPanel'
import { IconButton, Snackbar, Tooltip, Typography } from 'material-ui'
import CloseIcon from 'material-ui-icons/Close'
import CopyIcon from 'material-ui-icons/ContentCopy'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/styles/hljs'
import copy from 'copy-to-clipboard'

const styles = theme => ({
	root: {
		marginTop: '1em',
		flexGrow: 1
	},
	code: {
		width: '100%'
	},
	close: {
		width: theme.spacing.unit * 4,
		height: theme.spacing.unit * 4
	},
	contentContainer: {
		justifyContent: 'space-between',
		width: '100%'
	},
	copyButton: {
		float: 'right'
	}
})

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

class ComponentCodePanel extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			open: false
		}
		this.copyCode = this.copyCode.bind(this)
		this.handleSnackbarOpen = this.handleSnackbarOpen.bind(this)
		this.handleSnackbarClose = this.handleSnackbarClose.bind(this)
	}

	get content() {
		return generateCodeContent(this.props.options)
	}

	get viewContent() {
		return this.content.replace(/\t/g, '    ')
	}

	handleSnackbarOpen() {
		this.setState({ open: true })
	}

	handleSnackbarClose(e, reason) {
		if (reason === 'clickaway') return
		this.setState({ open: false })
	}

	copyCode() {
		copy(this.content)
		this.handleSnackbarOpen()
	}

	render() {
		const { classes } = this.props

		return (
			<div className={classes.root}>
				<Snackbar
					open={this.state.open}
					autoHideDuration={3000}
					onClose={this.handleSnackbarClose}
					SnackbarContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<Typography color="inherit">Code Copied</Typography>}
					action={
						<IconButton
							key="close"
							aria-label="Close"
							color="secondary"
							onClick={this.handleSnackbarClose}
							className={classes.close}
						>
							<CloseIcon />
						</IconButton>
					}
				/>
				<ExpansionPanel defaultExpanded>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography variant="headline">Component Code</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div className={classes.contentContainer}>
							<Tooltip title="Copy Code">
								<IconButton onClick={this.copyCode} className={classes.copyButton}>
									<CopyIcon />
								</IconButton>
							</Tooltip>
							<SyntaxHighlighter
								language="javascript"
								style={docco}
								className={classes.code}
								showLineNumbers
							>
								{this.viewContent}
							</SyntaxHighlighter>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		)
	}
}

ComponentCodePanel.propTypes = {
	classes: PropTypes.object.isRequired,
	options: PropTypes.object.isRequired
}

export default withStyles(styles)(ComponentCodePanel)
