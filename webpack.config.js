const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
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
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, 'docs'),
		compress: true,
		port: 9000,
		publicPath: path.join(__dirname, 'docs')
	}
}

const exampleConfig = {
	entry: {
		example: path.join(__dirname, 'example', 'index.js')
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'docs')
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
		contentBase: path.join(__dirname, 'docs'),
		compress: true,
		port: 9000,
		publicPath: path.join(__dirname, 'docs')
	}
}

module.exports = [ config, exampleConfig ]
