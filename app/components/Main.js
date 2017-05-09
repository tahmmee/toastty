import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import FullscreenDialog from 'material-ui-fullscreen-dialog'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import CopyIcon from 'material-ui/svg-icons/content/link';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import Iframe from 'react-iframe'

import NavBar from './NavBar';
import OrangeMuiTheme from './OrangeMuiTheme';
import FullScreen from 'react-fullscreen';
import CopyToClipboard from 'react-copy-to-clipboard';

var Config = require('Config')

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


class ReusableIframe extends React.Component {

	constructor (props) {
    super(props)
		this.state = {
			url: this.props.url
		}
  };

	shouldComponentUpdate() {
 		return true;
	};

	render(){
		var height = "70vh"
		if (this.props.fullscreen){
			height = "100vh"
		}

		return (
				<Iframe url={this.props.url}
              width="100%"
              height={height}
              display="initial"
              position="relative"
             	allowFullScreen/>
				)
	};

}

class FullscreenConsoleButton extends React.Component {
	constructor (props) {
    super(props)

    this.state = {
      open: true 
    }
  	this.onClose = this.onClose.bind(this);
  };

	onClose(){
		this.setState({open: false})
		this.props.onCloseFullscreen()
	}
  render() {
    return  (
		<div>
			<FullscreenDialog
				open={this.state.open}
				closeIcon={<p></p>}
				appBarStyle={{'height': "0px"}}
				actionButton={<RaisedButton
					label=''
					icon={<NavigationExpandMoreIcon />}
					backgroundColor="#FFC107"
					onTouchTap={this.onClose}
				/>}
			>
			<ReusableIframe url={this.props.mediaUrl} fullscreen={true} />
			</FullscreenDialog>

		</div>
		);
	}
}

class TestrunnerToolbar extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			build: "5.0.0-2703",
			toyBuild: "",
			servers: 2,
			platform: 1,
		};
  	this.onBuildChange = (event, newValue) => this.setState({build: newValue});
  	this.onToyBuildChange = (event, newValue) => this.setState({toyBuild: newValue});
  	this.onServerChange = (event, index, value) => this.setState({servers: value});
  	this.onPlatformChange = (event, index, value) => this.setState({platform: value});
		this.handleStartSession = this.handleStartSession.bind(this)
	}


	handleStartSession(event, index, value){
		var build = this.state.build
		var toyBuild = this.state.toyBuild
		var servers = this.state.servers * 2
		var platformName = "centos7"
		if (this.state.platform == 2){
			platformName = "ubuntu14"
		}
		this.props.onStart(servers, build, toyBuild, platformName)
	}


	render() {
		return (
			<Toolbar>
				<ToolbarGroup firstChild={true}>
					<ToolbarTitle text=" " />
					<TextField
						floatingLabelText="Build"
						floatingLabelFixed={true}
						defaultValue={this.state.build}
						onChange={this.onBuildChange}
					/>
					<CountSelector
						value={this.state.servers}
						onChange={this.onServerChange} />
					<PlatformSelector
						value={this.state.platform}
						onChange={this.onPlatformChange} />
					<TextField
      			floatingLabelFixed={true}
						floatingLabelText="Toy Build"
						hintText="http://spock-toy/..."
						onChange={this.onToyBuildChange}
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<RaisedButton
							onTouchTap={this.handleStartSession}
							label='Start'
					/>
				</ToolbarGroup>
			</Toolbar>
		)
	}
}

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

const PlatformSelector = (props) => (
	<SelectField
		floatingLabelText="Platform"
		value={props.value}
		onChange={props.onChange}
	>
	<MenuItem value={1} primaryText="CentOS 7" />
	<MenuItem value={2} primaryText="Ubuntu 14.04" />
	</SelectField>
);

class ConsoleCard extends React.Component {
	constructor (props) {
    super(props)
    this.state = {
      open: true,
			copied: false,
    }
  	this.handleExpandChange = this.handleExpandChange.bind(this);
  };

	handleExpandChange(e){
		this.setState({open: !this.state.open})
	}

  render() {
		var cardMedia = this.props.media
		if (this.state.open == false){
			cardMedia = (<FullscreenConsoleButton 
											onCloseFullscreen = {() => this.setState({ open: !this.state.open})}
											mediaUrl={this.props.mediaUrl} />)
		}
		return (
			<Card
					initiallyExpanded={true}
					onExpandChange={this.handleExpandChange}>
				<CardMedia>
					{cardMedia}
				</CardMedia>
				<CardActions
					actAsExpander={true} showExpandableButton={true} > 
					<FlatButton 
								icon={<ExitIcon />}
								onTouchTap={this.props.onTouchExit}
											label="Exit" />
					<CopyToClipboard text={this.props.mediaUrl}
          	onCopy={() => this.setState({copied: true})}>
						<FlatButton
								icon={<CopyIcon />}
								onTouchTap={(e) => e.stopPropagation()} label="Copy" />
					</CopyToClipboard>
					<FlatButton
							icon={<RefreshIcon />}
							onTouchTap={this.props.onTapRefresh}
							label="Refresh" />
				</CardActions>
				<Snackbar
          open={this.state.copied}
          message="Copied to your clipboard"
          autoHideDuration={4000}
          onRequestClose={() => this.setState({copied: false})}
        />
			</Card>
		);
	};
}

class TTYSessionTabs extends React.Component {
	constructor (props) {
    super(props)
  };


  render() {
		var tabButtonStyle = { paddingLeft: "20px", alignItems: "left"};

		// filter out closed sessions
		var ttys = this.props.ttys
		var hiddenButtonStyle = { width: "0px"};
		if (ttys.length == 1) {
				// hide tab button on first tty
				tabButtonStyle["height"] = "0px";
		}

		var tabItems = ttys.map((cFrameItem, index) =>
				<Tab
					buttonStyle={tabButtonStyle}
					key={cFrameItem.session}
					value={cFrameItem.session}
					label={ttys.length == 1 ? "" : cFrameItem.build}>
						<ConsoleCard media={cFrameItem.frame}
												 mediaUrl={cFrameItem.url}
												 session={cFrameItem.session}
												 onTouchExit={this.props.onTouchExit}
												 onTapRefresh={this.props.onTapRefresh}/>
				</Tab>
		);

    return (
			<Tabs
				onChange={this.props.onChange}
				style={{backgroundColor: "#212121"}}
				tabItemContainerStyle={{backgroundColor: "#212121"}}
				inkBarStyle={{backgroundColor: "rgb(255, 255, 255)"}}
				value={this.props.session}>
					{tabItems}
			</Tabs>
    );
  }
}




var Sesions = []
class Container extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			activeSession: "",
	 		ttySessions: [],
		};
		this.startSession = this.startSession.bind(this);
		this.getNewSession = this.getNewSession.bind(this);
		this.handleDeleteTab = this.handleDeleteTab.bind(this);
  	this.handleChangeSession = (value) => this.setState({activeSession: value});
  	this.handleTapRefresh = this.handleTapRefresh.bind(this);
  	this.getActiveTabIndex = this.getActiveTabIndex.bind(this);
  }

	getActiveTabIndex(){
		var tabIndex = 0
		var activeSession = this.state.activeSession
		this.state.ttySessions.map(function(tty, i){
			if(tty.session == activeSession){
				tabIndex = i;
			}
		})
		return tabIndex
	}

	handleTapRefresh(event){
		event.stopPropagation()

		// make a new frame for item
		var tabIndex = this.getActiveTabIndex()
		var ttySession = this.state.ttySessions[tabIndex]
		var refreshId = this.getNewSession()
		var url = ttySession.url+"&refresh="+refreshId
		var newFrame = <ReusableIframe url={url} id={ttySession.session} />
		this.setState(state => {
				state.ttySessions[tabIndex].frame = newFrame;
				return {ttySessions: state.ttySessions};
		});
	}

	getNewSession(){
		return (Math.random()*1e32).toString(36)
	}

	startSession(servers, build, toyBuild, platform){
		var session = this.getNewSession()
		var url = "http://"+Config.gottyHost+"?arg=servers:"+servers+"&arg=build:"+build+"&arg=platform:"+platform
		if (toyBuild != ""){
			url = url+"&arg=build_override:"+toyBuild
		}
		// session at end of url
		url=url+"&arg=session:"+session

		console.log(url)
		var cFrame = <ReusableIframe url={url} id={session} />
		var ttyItem = {
			frame: cFrame,
			build: build,
			servers: servers,
			session: session, 
			url: url,
		}
    this.setState({
        ttySessions: this.state.ttySessions.concat([ttyItem]),
   			activeSession: session, 
    })
	}

	handleDeleteTab(event, index, value){

 		event.stopPropagation();
		
		// get tab to remove
		var tabIndex = this.getActiveTabIndex() 

		// determine tab section to display after tab removed
		var nextActiveSession = ""
		if (this.state.ttySessions.length > 1){
			if (tabIndex == 0){
				// next tab
				nextActiveSession = this.state.ttySessions[tabIndex+1].session
			} else {
				// use previous
				nextActiveSession = this.state.ttySessions[tabIndex-1].session
			}
		}

		this.setState(state => {
				state.ttySessions.splice(tabIndex, 1);
				return {ttySessions: state.ttySessions,
				        activeSession: nextActiveSession};
		});

	}

  render() {
    return (
				<MuiThemeProvider muiTheme={OrangeMuiTheme}>
					<div>
						<TestrunnerToolbar
							onStart={this.startSession} />
						<TTYSessionTabs
							ttys = {this.state.ttySessions}
							session = {this.state.activeSession}
							onChange = {this.handleChangeSession}
							onTouchExit = {this.handleDeleteTab}
							onTapRefresh = {this.handleTapRefresh}
							/>
					</div>
				</MuiThemeProvider>
			);
	}

}


var appNode = document.getElementById('app-bar')
ReactDOM.render(<App />, appNode);

var launchNode = document.getElementById('launch-bar')
ReactDOM.render(<Container />, launchNode);


