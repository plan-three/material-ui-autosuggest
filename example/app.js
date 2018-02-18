import React from 'react'
import moment from 'moment-timezone'
import Autosuggest, { defaultProps } from '../src'
import AppBar from './components/app-bar'
import { withStyles } from 'material-ui/styles'
import OptionsPanel from './components/options-panel'
import SuggestionsPanel from './components/suggestions-panel'
import ComponentCodePanel from './components/component-code-panel'

const suggestions = moment.tz.names()
	.map(tz => ({ label: tz }))

const styles = {
	content: {
		padding: '1em'
	}
}

class App extends React.Component {
	constructor(props) {
		super(props)
		const {
			error,
			fullWidth,
			highlight,
			selectClosestMatch,
			suggestionLimit
		} = defaultProps

		this.state = {
			suggestions: [],
			value: '',
			options: {
				helperText: 'What\'s your timezone?',
				label: 'Timezone',
				fullWidth,
				error,
				highlight,
				selectClosestMatch,
				suggestionLimit
			}
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleOptionChange = this.handleOptionChange.bind(this)
		this.handleOptionSwitchChange = this.handleOptionSwitchChange.bind(this)
	}

	handleChange(value) {
		this.setState({ value })
	}

	handleOptionChange(key, e) {
		this.setState({
			options: {
				...this.state.options,
				[key]: e.target.value
			}
		})
	}

	handleOptionSwitchChange(key, e, val) {
		this.setState({
			options: {
				...this.state.options,
				[key]: val
			}
		})
	}

	handleSuggestionsChange(suggestions) {
		if (suggestions.length) {
			this.setState({ suggestions })
		}
	}

	render() {
		const { classes } = this.props
		const { options } = this.state
		return (
			<div>
				<AppBar title="Material-UI Autosuggest" />
				<div className={classes.content}>
					<Autosuggest
						suggestions={suggestions}
						searchKeys={['label']}
						labelKey="label"
						value={this.state.value}
						onChange={this.handleChange}
						label={options.label}
						fullWidth={options.fullWidth}
						helperText={options.helperText}
						error={options.error}
						highlight={options.highlight}
						selectClosestMatch={options.selectClosestMatch}
						suggestionLimit={options.suggestionLimit}
						onSuggestionsChange={this.handleSuggestionsChange.bind(this)}
					/>
					<OptionsPanel
						options={options}
						onOptionChange={this.handleOptionChange}
						onOptionSwitchChange={this.handleOptionSwitchChange}
					/>
					<ComponentCodePanel options={this.state.options} />
					<SuggestionsPanel suggestions={this.state.suggestions} />
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(App)
