## Material-UI Autosuggest Props
From [`../src/index.js`](../src/index.js)

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**classes** | `Object` |  | ✔ | 
**error** | `Boolean` | `false` |  | Whether or not the input should have error stylings
**fullWidth** | `Boolean` | `true` |  | Whether or not the input should be rendered at full width
**fuzzySearchOpts** | `Object` | `{     shouldSort: true,     includeMatches: true,     findAllMatches: false,     threshold: 0.6,     location: 0,     distance: 100,     maxPatternLength: 32,     minMatchCharLength: 1,     keys: [ 'label' ] }` |  | @see http://fusejs.io/#live-demo
**helperText** | `String` |  |  | The helper text of the input element
**inputLabelProps** | `Object` |  |  | Additional props for the inputLabel
**inputProps** | `Object` |  |  | Addition inputProps for the input component
**label** | `String` |  |  | The label for the rendered component
**labelKey** | `String` | `'label'` |  | 
**onBlur** | `Function` |  |  | The function to call when the input element blurs
**onChange** | `Function` |  | ✔ | The function to call when the value is changed
**onSuggestionsChange** | `Function` |  |  | A function to call when suggestions are changed
**productionPrefix** | `String` | `'mui-autosuggest'` |  | The prefix for generated JSS classNames
**renderInput** | `Function` |  |  | A custom function for rendering the input component
**renderSuggestion** | `Function` |  |  | A custom function for rendering an individual suggestion element
**renderSuggestionProps** | `Object` | `{     highlight: true,     renderSecondaryMatches: true }` |  | Props used by the `renderSuggestion` function
**renderSuggestionsContainer** | `Function` |  |  | A custom function for rendering the suggestion containing element
**selectClosestMatch** | `Boolean` | `false` |  | Select the closest match onBlur
**suggestionLimit** | `Number` | `5` |  | The number of suggestions to render
**suggestions** | `Array` |  | ✔ | The array of suggestions
**value** | `String` | `''` |  | The value of the input
