const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		index: path.join(__dirname, 'src', 'index.js'),
		example: path.join(__dirname, 'example', 'index.js')
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
				path.resolve(__dirname, 'src'),
				path.resolve(__dirname, 'example')
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
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Material-UI Autosuggest Example',
			template: path.join(__dirname, 'example', 'index.html'),
			inject: false
		})
	],
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	}
}
