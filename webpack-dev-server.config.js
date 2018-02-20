const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV

let plugins = [
	new HtmlWebpackPlugin({
		title: 'Material-UI Autosuggest Example',
		template: path.join(__dirname, 'example', 'index.html')
	})
]

if (env === 'production') {
	plugins = [
		...plugins,
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env)
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
}

module.exports = {
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
	plugins: plugins,
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, 'docs'),
		compress: true,
		port: 9000,
		host: '0.0.0.0'
	}
}
