import React from 'react';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';


import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  	this.handleToggle = () => this.setState({open: !this.state.open});
  }
	
	render() {
			return (
				<div>
					<AppBar
						title="Toastty"
						onLeftIconButtonTouchTap = {this.handleToggle}
					/>
					<Drawer
						docked={false}
						width={200}
						open={this.state.open}
						onRequestChange={(open) => this.setState({open})}
					>
						<MenuItem onTouchTap={this.handleToggle}>Menu Item</MenuItem>
						<MenuItem onTouchTap={this.handleToggle}>Menu Item 2</MenuItem>
					</Drawer>
				</div>
			);
	}
}

