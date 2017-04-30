import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

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

    				<Divider />

						<MenuItem onTouchTap={this.handleToggle}>SERVER</MenuItem>
						<MenuItem onTouchTap={this.handleToggle}>SDK</MenuItem>
						<MenuItem onTouchTap={this.handleToggle}>MOBILE</MenuItem>
						<MenuItem onTouchTap={this.handleToggle}>PERF</MenuItem>
					</Drawer>
				</div>
			);
	}
}

