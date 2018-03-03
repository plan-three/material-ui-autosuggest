import React from 'react'
import PropTypes from 'prop-types'
import ReactAutosuggest from 'react-autosuggest'
import { withStyles } from 'material-ui/styles'
import Fuse from 'fuse.js'
import renderInput from './lib/render-input'
import renderSuggestion from './lib/render-suggestion'
import renderSuggestionsContainer from './lib/render-suggestions-container'

const styles = theme => ({
	container: {
		flexGrow: 1,
		position: 'relative',
		height: 200
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit * 3,
		left: 0,
		right: 0,
		zIndex: 9
	},
	suggestion: {
		display: 'block'
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none'
	}
})

class Autosuggest extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: props.value,
			suggestions: []
		}
		this.fuzzySearcher = new Fuse(
			props.suggestions,
			props.fuzzySearchOpts
		)

		this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this)
		this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleBlur = this.handleBlur.bind(this)
		this.getSuggestions = this.getSuggestions.bind(this)
		this.getSuggestionValue = this.getSuggestionValue.bind(this)
		this.renderSuggestion = props.renderSuggestion && typeof props.renderSuggestion === 'function' ? props.renderSuggestion : renderSuggestion.bind(this)
		this.renderInput = props.renderInput && typeof props.renderInput === 'function' ? props.renderInput : renderInput.bind(this)
		this.renderSuggestionsContainer = props.renderSuggestionsContainer && typeof props.renderSuggestionsContainer === 'function' ? props.renderSuggestionsContainer : renderSuggestionsContainer.bind(this)
		this.handleSuggestionsChange = this.handleSuggestionsChange.bind(this)
	}

	get suggestionLimit() {
		const { suggestionLimit, suggestions } = this.props
		return suggestionLimit < suggestions.length ? suggestionLimit : suggestions.length
	}

	getSuggestions(value) {
		const suggestions = this.fuzzySearcher
			.search(value)
		let res = []
		suggestions.slice(0, this.suggestionLimit)
			.forEach(suggestion => {
				suggestion.matches.forEach(match => {
					res.push({
						item: suggestion.item,
						match
					})
				})
			})
		return res.slice(0, this.suggestionLimit)
	}

	getSuggestionValue(suggestion) {
		return suggestion.item[suggestion.match.key]
	}

	handleBlur() {
		let value = this.state.value
		if (this.props.selectClosestMatch) {
			const suggestion = this.state.suggestions[0]
			value = suggestion &&
				suggestion.hasOwnProperty('item') &&
				suggestion.hasOwnProperty('match') &&
				suggestion.item[suggestion.match.key] ?
				suggestion.item[suggestion.match.key] :
				value
			this.setState({ value })
			this.props.onChange(value)
		}
		if (typeof this.props.onBlur === 'function') {
			this.props.onBlur(value)
		}
	}

	handleSuggestionsChange() {
		const { onSuggestionsChange } = this.props
		if (typeof onSuggestionsChange === 'function') {
			onSuggestionsChange(this.state.suggestions.slice(0, this.suggestionLimit))
		}
	}

	handleSuggestionsFetchRequested({ value }) {
		this.setState({
			suggestions: this.getSuggestions(value)
		}, this.handleSuggestionsChange())
	}

	handleSuggestionsClearRequested() {
		this.setState({
			suggestions: []
		}, this.handleSuggestionsChange())
	}

	handleChange(event, { newValue }) {
		this.setState({
			value: newValue
		})
		this.props.onChange(newValue)
	}

	render() {
		const { classes } = this.props

		return (
			<ReactAutosuggest
				theme={{
					container: classes.container,
					suggestionsContainerOpen: classes.suggestionsContainerOpen,
					suggestionsList: classes.suggestionsList,
					suggestion: classes.suggestion
				}}
				renderInputComponent={this.renderInput}
				suggestions={this.state.suggestions}
				onSuggestionsFetchRequested={
					this.handleSuggestionsFetchRequested
				}
				onSuggestionsClearRequested={
					this.handleSuggestionsClearRequested
				}
				renderSuggestionsContainer={this.renderSuggestionsContainer}
				getSuggestionValue={this.getSuggestionValue}
				renderSuggestion={this.renderSuggestion}
				inputProps={{
					classes,
					value: this.state.value,
					onChange: this.handleChange,
					onBlur: this.handleBlur,
					label: this.props.label,
					inputLabelProps: this.props.inputLabelProps,
					fullWidth: this.props.fullWidth,
					error: this.props.error,
					helperText: this.props.helperText,
					...this.props.inputProps
				}}
			/>
		)
	}
}

Autosuggest.defaultProps = {
	selectClosestMatch: false,
	suggestionLimit: 5,
	error: false,
	value: '',
	fuzzySearchOpts: {
		shouldSort: true,
		includeMatches: true,
		findAllMatches: false,
		threshold: 0.6,
		location: 0,
		distance: 100,
		maxPatternLength: 32,
		minMatchCharLength: 1,
		keys: [ 'label' ]
	},
	fullWidth: true,
	highlight: true
}

Autosuggest.propTypes = {
	/**
	 * A custom function for rendering the input component
	 */
	renderInput: PropTypes.func,
	/**
	 * A custom function for rendering an individual suggestion element
	 */
	renderSuggestion: PropTypes.func,
	/**
	 * A custom function for rendering the suggestion containing element
	 */
	renderSuggestionsContainer: PropTypes.func,
	/**
	 * The array of suggestions
	 */
	suggestions: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
	/**
	 * The function to call when the value is changed
	 */
	onChange: PropTypes.func.isRequired,
	/**
	 * The function to call when the input element blurs
	 */
	onBlur: PropTypes.func,
	/**
	 * Addition inputProps for the input component
	 */
	inputProps: PropTypes.object,
	/**
	 * The value of the input
	 */
	value: PropTypes.string,
	/**
	 * Additional props for the inputLabel
	 */
	inputLabelProps: PropTypes.object,
	/**
	 * Whether or not the input should be rendered at full width
	 */
	fullWidth: PropTypes.bool,
	/**
	 * Whether or not the input should have error stylings
	 */
	error: PropTypes.bool,
	/**
	 * The helper text of the input element
	 */
	helperText: PropTypes.string,
	/**
	 * Select the closest match onBlur
	 */
	selectClosestMatch: PropTypes.bool,
	/**
	 * Whether or not to highlight the search matches when rendering suggestions
	 */
	highlight: PropTypes.bool,
	/**
	 * A function to call when suggestions are changed
	 */
	onSuggestionsChange: PropTypes.func,
	/**
	 * @see http://fusejs.io/#live-demo
	 */
	fuzzySearchOpts: PropTypes.object.isRequired,
	/**
	 * The number of suggestions to render
	 */
	suggestionLimit: PropTypes.number,
	/**
	 * The label for the rendered component
	 */
	label: PropTypes.string
}

export default withStyles(styles, { withTheme: true })(Autosuggest)

exports.defaultProps = Autosuggest.defaultProps

exports.propTypes = Autosuggest.propTypes
