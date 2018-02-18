const path = require('path')
const fs = require('fs')
const reactDocgen = require('react-docgen')
const ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer')
const componentPath = path.join(__dirname, '..', 'src', 'index.js')

const renderer = new ReactDocGenMarkdownRenderer({
	componentsBasePath: __dirname,
	template: `## Material-UI Autosuggest Props
{{#if srcLink }}From [\`../src/index.js\`](../src/index.js){{/if}}

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
{{#each props}}
**{{@key}}** | \`{{> (typePartial this) this}}\` | {{#if this.defaultValue}}\`{{{this.defaultValue}}}\`{{/if}} | {{#if this.required}}✔{{/if}} | {{#if this.description}}{{{this.description}}}{{/if}}
{{/each}}
`
})

fs.readFile(componentPath, (error, content) => {
	const documentationPath = path.join(
		__dirname,
		'..',
		'docs',
		'Autosuggest.md'
	)
	const doc = reactDocgen.parse(content)
	fs.writeFileSync(documentationPath, renderer.render(componentPath, doc, []))
})
