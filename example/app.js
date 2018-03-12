import React from 'react'
import Autosuggest, { defaultProps } from '../src'
import AppBar from './components/app-bar'
import { MuiThemeProvider, withStyles, createMuiTheme } from 'material-ui/styles'
import OptionsPanel from './components/options-panel'
import SuggestionsPanel from './components/suggestions-panel'
import ComponentCodePanel from './components/component-code-panel'
import Reboot from 'material-ui/Reboot'
import suggestions from './countries.json'

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
			renderSuggestionProps,
			selectClosestMatch,
			suggestionLimit
		} = defaultProps

		this.state = {
			themeType: 'light',
			suggestions: [],
			value: '',
			options: {
				helperText: 'Enter your country (name or abbreviation)',
				label: 'Country',
				labelKey: 'label',
				fullWidth,
				error,
				renderSuggestionProps,
				selectClosestMatch,
				suggestionLimit,
				panels: {
					componentCode: {
						enabled: false,
						displayName: 'Component Code'
					},
					suggestions: {
						enabled: false,
						displayName: 'Most Recent Suggestions'
					}
				}
			}
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleOptionChange = this.handleOptionChange.bind(this)
		this.handleOptionSwitchChange = this.handleOptionSwitchChange.bind(this)
	}

	togglePanelEnabled(key, enabled) {
		const { panels } = this.state.options
		panels[key].enabled = enabled
		this.setState({
			options: {
				...this.state.options,
				panels
			}
		})
	}

	handleChange(value) {
		this.setState({ value })
	}

	handleRenderSuggestionPropsChange(key, e, checked) {
		const { options } = this.state
		options.renderSuggestionProps[key] = checked
		this.setState({ options })
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

	toggleDarkTheme() {
		const themeType = this.state.themeType === 'light' ? 'dark' : 'light'
		this.setState({ themeType })
	}

	render() {
		const { classes } = this.props
		const { options, themeType } = this.state
		const { panels } = options
		const theme = createMuiTheme({ palette: { type: themeType } })

		return (
			<MuiThemeProvider theme={theme}>
				<div id="main">
					<Reboot />
					<AppBar
						title="Material-UI Autosuggest"
						panels={panels}
						togglePanelEnabled={this.togglePanelEnabled.bind(this)}
						toggleDarkTheme={this.toggleDarkTheme.bind(this)}
						themeType={this.state.themeType}
					/>
					<div className={classes.content}>
						<Autosuggest
							suggestions={suggestions}
							fuzzySearchOpts={{
								...defaultProps.fuzzySearchOpts,
								keys: [ 'label', 'abbr' ]
							}}
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
							renderSuggestionProps={this.state.renderSuggestionProps}
							multiSelection
						/>
						<OptionsPanel
							options={options}
							onOptionChange={this.handleOptionChange}
							onOptionSwitchChange={this.handleOptionSwitchChange}
							onRenderSuggestionPropsChange={this.handleRenderSuggestionPropsChange.bind(this)}
						/>
						{
							this.state.options.panels.componentCode.enabled &&
							<ComponentCodePanel options={this.state.options} themeType={this.state.themeType} />
						}
						{
							this.state.options.panels.suggestions.enabled &&
							<SuggestionsPanel suggestions={this.state.suggestions} themeType={this.state.themeType} />
						}
						<style dangerouslySetInnerHTML={{ __html: `body { background-color: ${theme.palette.background.paper} }` }} />
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
}

export default withStyles(styles)(App)
