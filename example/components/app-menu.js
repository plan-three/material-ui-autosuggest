import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import { MenuList, MenuItem } from 'material-ui/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import { ListItemText } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'
import { withStyles } from 'material-ui/styles'
import ClickAwayListener from 'material-ui/utils/ClickAwayListener'

const styles = {
	menu: {
		position: 'absolute',
		zIndex: 9,
		right: 0
	}
}

class AppMenu extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			menuOpen: false
		}
		this.handleSelection = this.handleSelection.bind(this)
		this.toggleMenu = this.toggleMenu.bind(this)
	}

	toggleMenu(menuOpen) {
		this.setState({ menuOpen })
	}

	handleSelection(key, val) {
		this.props.togglePanelEnabled(key, val)
	}

	render() {
		const { menuOpen } = this.state
		const { panels, classes } = this.props

		return (
			<div>
				<IconButton
					aria-label="More"
					aria-haspopup="true"
					onClick={this.toggleMenu.bind(this, !menuOpen)}
					color="inherit"
				>
					<MoreVertIcon />
				</IconButton>
				{
					menuOpen &&
					<ClickAwayListener onClickAway={this.toggleMenu.bind(this, false)}>
						<Paper className={classes.menu}>
							<MenuList>
								{
									Object.keys(panels).map(panelKey => {
										const panel = panels[panelKey]
										return (
											<MenuItem
												key={`${panelKey}-panel`}
												onClick={this.handleSelection.bind(this, panelKey, !panel.enabled)}
											>
												<Checkbox
													checked={panel.enabled}
													tabIndex={-1}
													disableRipple
												/>
												<ListItemText inset primary={panel.displayName} />
											</MenuItem>
										)
									})
								}
							</MenuList>
						</Paper>
					</ClickAwayListener>
				}
			</div>
		)
	}
}

AppMenu.propTypes = {
	classes: PropTypes.object.isRequired,
	togglePanelEnabled: PropTypes.func.isRequired,
	panels: PropTypes.object.isRequired
}

export default withStyles(styles)(AppMenu)
