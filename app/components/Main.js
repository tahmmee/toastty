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

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import Iframe from 'react-iframe'

import NavBar from './NavBar';
import OrangeMuiTheme from './OrangeMuiTheme';
import {
	amber100, amber500, amber700,
	brown100, brown500, brown700,
	grey100, grey600, grey900,
	
} from 'material-ui/styles/colors';

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


const TestrunnerToolbar = (props) => (
	<Toolbar>
		<ToolbarGroup firstChild={true}>
			<ToolbarTitle text=" " />
			<TextField
				floatingLabelText="Build"
				floatingLabelFixed={true}
				defaultValue={props.defaultBuild}
				onChange={props.onBuildChange}
			/>
			<CountSelector
				value={props.defaultServers}
				onChange={props.onServerChange} />
		</ToolbarGroup>
		<ToolbarGroup>
			<RaisedButton
					onTouchTap={props.onStart}
					label='Start'
			/>
		</ToolbarGroup>
	</Toolbar>
);

const CountSelector = (props) => (
	<SelectField
		floatingLabelText="Servers"
		value={props.value}
		onChange={props.onChange}
	>
	<MenuItem value={1} primaryText="2" />
	<MenuItem value={2} primaryText="4" />
	<MenuItem value={3} primaryText="6" />
	<MenuItem value={4} primaryText="8" />
	</SelectField>
);

var consoleFrames = []

class CreateSessionForm extends React.Component {
	constructor (props) {
    super(props)
    this.state = {
    	value: props.servers,
			build: props.build,
			session: 0,
			activeTab: 0,
			open: false,
    }

  	this.handleChangeBuild= (event, newValue) => this.setState({build: newValue});
  	this.handleChangeValue = (event, index, value) => this.setState({value});
		this.startSession = this.startSession.bind(this) 
		this.handleChangeSession = this.handleChangeSession.bind(this)

  };


  handleChangeSession(value) {
    this.setState({
			activeTab: value,
    });
  };

	startSession(event, index, value){
		var servers = this.state.value * 2
		var build = this.state.build
		var session = this.state.session+1
		this.setState({session: session, activeTab: session, open: true})
		var url = "http://localhost:7021?arg=servers:"+servers+"&arg=build:"+build+"&arg=session:"+session
		var cFrame = (<Iframe url={url}
									 width="100%"
									 height="80vh"
									 display="initial"
									 position="relative"
									allowFullScreen/>
							)
		consoleFrames.push({
			frame: cFrame,
			build: build,
			servers: servers,
			session: session,
		})
	}

  render() {
		var cFrame = <div></div>;
		var consoleTabs = null;

		if (consoleFrames.length == 1) {
			consoleTabs = consoleFrames[0].frame
		} else {
			var tabItems = consoleFrames.map((cFrameItem) =>
				<Tab
					buttonStyle={{ paddingLeft: "20px", alignItems: "left"}}
					key={cFrameItem.session}
					value={cFrameItem.session}
					label={cFrameItem.build}>
					<Card>
						<CardMedia >
							{cFrameItem.frame}
						</CardMedia>
					</Card>
				</Tab>
			);
			consoleTabs = (<Tabs
												onChange={this.handleChangeSession}
												style={{backgroundColor: "#212121"}}
												tabItemContainerStyle={{backgroundColor: "#212121"}}
												inkBarStyle={{backgroundColor: "rgb(255, 255, 255)"}}
												value={this.state.activeTab}>
												{tabItems}
											</Tabs>)
		}	

    return (
			<div>
				<TestrunnerToolbar
					defaultBuild={this.state.build}
					onBuildChange={this.handleChangeBuild}
					defaultServers={this.state.value}
					onServerChange={this.handleChangeValue}
					onStart={this.startSession} />
				{consoleTabs}
			</div>
    );
  }
}




var Sesions = []
class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
				<MuiThemeProvider muiTheme={OrangeMuiTheme}>
					<div>
						<CreateSessionForm build={"5.0.0-2703"} servers={2}/>
					</div>
				</MuiThemeProvider>
			);
	}

}


var appNode = document.getElementById('app-bar')
ReactDOM.render(<App />, appNode);

var launchNode = document.getElementById('launch-bar')
ReactDOM.render(<Container />, launchNode);


