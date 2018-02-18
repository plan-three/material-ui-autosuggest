const path = require('path')

module.exports = {
	entry: {
		index: path.join(__dirname, 'src', 'index.js')
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		library: ['material-ui-autosuggest'],
		libraryTarget: 'umd'
	},
	module: {
		rules: [{
			test: /.jsx?$/,
			include: [
				path.resolve(__dirname, 'src')
			],
			exclude: [
				path.resolve(__dirname, 'node_modules')
			],
			loader: 'babel-loader',
			query: {
				presets: [
					'es2015',
					'react'
				]
			}
		}]
	},
	externals: {
		react: 'react',
		'material-ui': 'material-ui'
	},
	resolve: {
		extensions: ['.json', '.js', '.jsx', '.css']
	},
	devtool: 'source-map'
}
