import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import FullscreenDialog from 'material-ui-fullscreen-dialog'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import {List, ListItem} from 'material-ui/List';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';

import NavBar from './NavBar';
import OrangeMuiTheme from './OrangeMuiTheme';
import Iframe from 'react-iframe'


const muiTheme = OrangeMuiTheme;
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider muiTheme={OrangeMuiTheme}>
    <NavBar />
  </MuiThemeProvider>
);

class FullscreenConsoleButton extends React.Component {
	constructor (props) {
    super(props)

    this.state = {
      open: false 
    }
  };


  render() {
    return  (
		<div>
			<FullscreenDialog
				open={this.state.open}
				onRequestClose={() => this.setState({ open: false })}
				closeIcon={<NavigationExpandMoreIcon/>}
				title={'Build: 5.1.1-2332'}
				actionButton={<FlatButton
					label='Done'
					onTouchTap={() => this.setState({ open: false })}
				/>}
			>
				<Iframe url="http://localhost:7021"
								width="100%"
								height="80vh"
								display="initial"
								position="relative"
							allowFullScreen/>
			</FullscreenDialog>
			<RaisedButton
          onTouchTap={() => this.setState({ open: true })}
          label='Start'
      />
		</div>
		);
	}
}

class CreateSessionForm extends React.Component {
	constructor (props) {
    super(props)

    this.state = {
    	value: 2,
			build: "5.0.0-2759",
			open: false,
    }

  	this.handleChangeBuild= (event, newValue) => this.setState({build: newValue});
  	this.handleChangeValue = (event, index, value) => this.setState({value});
		this.startSession = this.startSession.bind(this) 
  };

	startSession(event, index, value){
		var servers = this.state.value * 2
		var build = this.state.build
		this.setState({open: true})
	}

  render() {
		var console = <div></div> 
		var servers = this.state.value * 2
		var build = this.state.build
		var url = "http://localhost:7021?arg=servers:"+servers+"&arg=build:"+build
		
		if (this.state.open) {
			console = <Iframe url={url}
									width="100%"
									height="80vh"
									display="initial"
									position="relative"
								allowFullScreen/>;
		}

    return (
  		<Card>
	    	<CardMedia>
					<div>
						<Toolbar>
							<ToolbarGroup firstChild={true}>
								<ToolbarTitle text=" " />
								<TextField
									floatingLabelText="Build"
									floatingLabelFixed={true}
									defaultValue={this.state.build}
									onChange={this.handleChangeBuild}
								/>
								<SelectField
									floatingLabelText="Servers"
									value={this.state.value}
									onChange={this.handleChangeValue}
								>
									<MenuItem value={1} primaryText="2" />
									<MenuItem value={2} primaryText="4" />
									<MenuItem value={3} primaryText="6" />
									<MenuItem value={4} primaryText="8" />
								</SelectField>
						</ToolbarGroup>
						<ToolbarGroup>
							<RaisedButton
									onTouchTap={this.startSession}
									label='Start'
							/>
						</ToolbarGroup>
					</Toolbar>
					{console}
				</div>
			</CardMedia>
		</Card>
    );
  }
}




class Container extends React.Component {
  constructor(props) {
    super(props);
    this.handleStart = this.handleStart.bind(this);
  }

  render() {
    return (
				<MuiThemeProvider muiTheme={OrangeMuiTheme}>
					<div>
						<CreateSessionForm />
					</div>
				</MuiThemeProvider>
			);
	}

  handleStart(e) {
			console.log("holla")
  }

}


var appNode = document.getElementById('app-bar')
var containerNode = document.getElementById('container')
ReactDOM.render(<App />, appNode);
ReactDOM.render(<Container />, containerNode);
