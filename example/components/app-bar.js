import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import {
	AppBar as MuiAppBar,
	IconButton,
	Toolbar,
	Tooltip,
	Typography
} from 'material-ui'
import AppMenu from './app-menu'
import Github from './github'
import Lightbulb from 'material-ui-icons/LightbulbOutline'

const styles = {
	root: {
		width: '100%'
	},
	flex: {
		flex: 1
	}
}

const AppBar = ({ title, classes, panels, togglePanelEnabled, toggleDarkTheme, themeType }) => {
	return (
		<div className={classes.root}>
			<MuiAppBar position="static">
				<Toolbar>
					<Typography variant="title" color="inherit" className={classes.flex}>
						{ title }
					</Typography>
					<Tooltip id="appbar-github" title="GitHub repo" enterDelay={300}>
						<IconButton
							component="a"
							color="inherit"
							href="https://github.com/plan-three/material-ui-autosuggest"
							aria-labelledby="appbar-github"
						>
							<Github />
						</IconButton>
					</Tooltip>
					<Tooltip title={`Use ${themeType === 'dark' ? 'Light' : 'Dark'} Theme`} enterDelay={300}>
						<IconButton
							onClick={toggleDarkTheme}
							color="inherit"
						>
							<Lightbulb />
						</IconButton>
					</Tooltip>
					<AppMenu panels={panels} togglePanelEnabled={togglePanelEnabled} />
				</Toolbar>
			</MuiAppBar>
		</div>
	)
}

AppBar.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	panels: PropTypes.object.isRequired,
	togglePanelEnabled: PropTypes.func.isRequired
}

export default withStyles(styles)(AppBar)
