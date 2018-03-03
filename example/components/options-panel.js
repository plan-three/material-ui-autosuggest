import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ExpansionPanel, {
	ExpansionPanelSummary,
	ExpansionPanelDetails
} from 'material-ui/ExpansionPanel'
import { Grid, Switch, TextField, Typography } from 'material-ui'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'

const styles = {
	root: {
		flexGrow: 1
	}
}

const OptionsPanel = ({
	classes,
	options,
	onOptionChange,
	onOptionSwitchChange
}) => {
	const {
		error,
		fullWidth,
		label,
		helperText,
		highlight,
		selectClosestMatch,
		suggestionLimit
	} = options

	function onLimitChange(e) {
		onOptionChange(
			'suggestionLimit',
			Object.assign({}, e, {
				target: { value: parseInt(e.target.value) }
			})
		)
	}

	return (
		<div className={classes.root}>
			<ExpansionPanel defaultExpanded>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="headline">Autosuggest Props Options</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container>
						<Grid item xs={12}>
							<FormGroup row>
								<FormControlLabel
									control={
										<Switch
											checked={fullWidth}
											onChange={onOptionSwitchChange.bind(null, 'fullWidth')}
										/>
									}
									label="Full Width"
								/>
							</FormGroup>
						</Grid>
						<Grid item xs={12}>
							<FormGroup row>
								<FormControlLabel
									control={
										<Switch
											checked={error}
											onChange={onOptionSwitchChange.bind(null, 'error')}
										/>
									}
									label="Error"
								/>
							</FormGroup>
						</Grid>
						<Grid item xs={12}>
							<FormGroup row>
								<FormControlLabel
									control={
										<Switch
											checked={highlight}
											onChange={onOptionSwitchChange.bind(null, 'highlight')}
										/>
									}
									label="Highlight results"
								/>
							</FormGroup>
						</Grid>
						<Grid item xs={12}>
							<FormGroup row>
								<FormControlLabel
									control={
										<Switch
											checked={selectClosestMatch}
											onChange={onOptionSwitchChange.bind(null, 'selectClosestMatch')}
										/>
									}
									label="Select Closest Match"
								/>
							</FormGroup>
						</Grid>
					</Grid>
				</ExpansionPanelDetails>
				<ExpansionPanelDetails>
					<Grid container>
						<Grid item xs={12} md={4}>
							<TextField
								value={label}
								fullWidth
								label="Label"
								onChange={onOptionChange.bind(null, 'label')}
								helperText="The Autosuggest component label"
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								value={helperText}
								fullWidth
								label="Helper Text"
								onChange={onOptionChange.bind(null, 'helperText')}
								helperText="The Autosuggest component helper text"
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								value={suggestionLimit}
								inputProps={{ min: 1 }}
								type="number"
								fullWidth
								label="Suggestion Limit"
								onChange={onLimitChange}
								helperText="The number of results to render"
							/>
						</Grid>
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	)
}

OptionsPanel.propTypes = {
	classes: PropTypes.object.isRequired,
	options: PropTypes.object.isRequired,
	onOptionChange: PropTypes.func.isRequired,
	onOptionSwitchChange: PropTypes.func.isRequired
}

export default withStyles(styles)(OptionsPanel)
