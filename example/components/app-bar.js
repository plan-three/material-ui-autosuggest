import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import {
	AppBar as MuiAppBar,
	Toolbar,
	Typography
} from 'material-ui'

const styles = {
	root: {
		width: '100%'
	},
	flex: {
		flex: 1
	}
}

const AppBar = ({ title, classes }) => {
	return (
		<div className={classes.root}>
			<MuiAppBar position="static">
				<Toolbar>
					<Typography variant="title" color="inherit" className={classes.flex}>
						{ title }
					</Typography>
				</Toolbar>
			</MuiAppBar>
		</div>
	)
}

AppBar.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired
}

export default withStyles(styles)(AppBar)
