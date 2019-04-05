import React from 'react'
import ReactDOM from 'react-dom';
import { copyStyles } from '../utils/DOM';
import SplitterLayout from 'react-splitter-layout';
//import NewWindow from 'react-new-window'
import { Button, CustomInput, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { Button } from '@rmwc/button';
import { StyleSheet, css } from 'aphrodite/no-important';
import {Strings} from '../i18n/strings';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideNav from '../components/SideNav';
import TestState from '../components/TestState';
//import Store from '../components/Store';
import ChromeTabs from 'chrome-tabs';

import { remote } from 'electron';

import * as platform from 'platform';

//import '@material/button/dist/mdc.button.css';

import '../styles/app.global.css';
import '../styles/app.global.scss';

import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faTimes,
    faSearchMinus,
    faSearchPlus,
    faMapMarkerAlt,
    faHandPointLeft,
    faHome
} from '@fortawesome/free-solid-svg-icons';

/* Font Awesome Icons */
library.add(
    faTimes,
    faSearchMinus,
    faSearchPlus,
    faMapMarkerAlt,
    faHandPointLeft,
    faHome
);

import TitleBar from 'frameless-titlebar';
// import { Titlebar, Color } from '@inceldes/cet';

// new Titlebar({
//     backgroundColor: Color.getLighterColor(),
//     //icon: './favicon.svg',
//     enableMnemonics: true,
//     shadow: true,
//     menu: remote.Menu.buildFromTemplate([
//       {
//         label: '&File',
//         submenu: [
//           {
//             label: '&Open',
//             accelerator: 'Ctrl+O'
//           },
//           {
//             label: '&Close',
//             accelerator: 'Ctrl+W',
//             click: () => {
//               remote.getCurrentWindow().close();
//             }
//           }
//         ]
//       },
//       {
//         label: '&View',
//         submenu: [
//           {
//             label: '&Reload',
//             accelerator: 'Ctrl+R',
//             click: () => {
//               remote.getCurrentWindow().webContents.reload();
//             }
//           },
//           {
//             label: 'Toggle &Full Screen',
//             accelerator: 'F11',
//             click: () => {
//               remote.getCurrentWindow().setFullScreen(
//                 !remote.getCurrentWindow().isFullScreen()
//               );
//             }
//           },
//           {
//             label: 'Toggle &Developer Tools',
//             accelerator: 'Alt+Ctrl+I',
//             click: () => {
//               remote.getCurrentWindow().toggleDevTools();
//             }
//           }
//         ]
//       },
//       {
//         label: 'Help',
//         submenu: [
//           {
//             label: 'Learn More',
//             click() {
//               remote.shell.openExternal('http://electron.atom.io');
//             }
//           },
//           {
//             label: 'Documentation',
//             click() {
//               remote.shell.openExternal(
//                 'https://github.com/atom/electron/tree/master/docs#readme'
//               );
//             }
//           },
//           {
//             label: 'Community Discussions',
//             click() {
//               remote.shell.openExternal('https://discuss.atom.io/c/electron');
//             }
//           },
//           {
//             label: 'Search Issues',
//             click() {
//               remote.shell.openExternal('https://github.com/atom/electron/issues');
//             }
//           }
//         ]
//       }
//     ])
// });

//import 'bootstrap/dist/css/bootstrap.css';
//import './styles.scss';

// const App = () => (
//     <div>
//         <h4>Welcome to React, Electron and JS!!</h4>
//         <NewWindow title="Test">
//             <h1>Hi π‘‹</h1>
//         </NewWindow>
//     </div>
// )


const StoreTest = React.createContext({
  filter: '',
  count: 0
});

const MyTestState = <TestState/>;

//MyTestState.contextType = StoreTest;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalsIndex: 0
    };

    this.toggle = this.toggle.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.myTestStateRef = React.createRef();
  }

  componentWillMount() {
    document.body.classList.add(`platform-${process.platform}`);
  }

  componentDidMount() {
    setTimeout(() => {
      let el = document.querySelector('.chrome-tabs');
      let chromeTabs = new ChromeTabs();
      chromeTabs.init(el);
  
      chromeTabs.addTab({
        title: 'New Tab',
        favicon: false
      });

      el.addEventListener('tabDetach', ({ detail }) => {
        console.log('Tab detached', detail.tabEl, detail.pointer.x, detail.pointer.y);

        //detail.tabEl.releasePointerCapture(detail.pointer.pointerId);
        
        this.openPopup(detail.tabEl, detail.pointer);
        chromeTabs.removeTab(detail.tabEl);
      });

    }, 0);
  }

  componentDidUpdate() {

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }



  openPopup(el = null, pointer = null) {

    console.log('openPopup');
    //window.open('https://github.com', '_blank', 'nodeIntegration=no')

    const mainBounds = remote.getCurrentWindow().getBounds();
    const width = 500, height = 400;

    var left = mainBounds.x, top = mainBounds.y;

    if(pointer) {


      if(el) {
        const elWidth = el.outerWidth;
        const elHeight = el.outerHeight;

        const elX = el.getBoundingClientRect().left;
        //const elY = el.getBoundingClientRect().top;
        

        left += elX;
        //top += elY + 30;
        top += pointer.y;

        //window.scrollX + document.querySelector('#elementId').getBoundingClientRect().left // X
        //window.scrollY + document.querySelector('#elementId').getBoundingClientRect().top // Y
      } else {
        left += pointer.x;
        top += pointer.y;
      }


    } else {
      left += mainBounds.width / 2 - width / 2;
      top += mainBounds.height / 2 - height / 2;
    }

    let modal = window.open(
      '',
      `modal-${this.state.modalsIndex++}`,
      `left=${left},top=${top},width=${width},height=${height},nodeIntegration=no`
    );

    modal.focus();

    console.log('new modal', modal);
    console.log('new modal.document', modal.document);
    console.log('new modal.addEventListener', modal.addEventListener);
    //console.log('new modal.document.write', modal.document.write);
    //console.log('new modal.addListener', modal.addListener);
    //console.log('new modal.document.body', modal.document.body);
    //console.log('new modal.document.write', modal.document.write);

    // modal.webContents.on('did-finish-load', function() {
    //   this.console.log('Modal did-finish-load', this);
    // });

    // modal.document.addEventListener('DOMContentLoaded', function() {
    //   //console.log(this);
    //   this.console.log('Modal DOMContentLoaded', this);
    //   this.document.body.innerHTML = '<div id="hdr"></div>';

    //   // copyStyles(document, this.document);

    //   // ReactDOM.render(
    //   //     <Header/>,
    //   //     //MyTestState,
    //   //     this.document.getElementById('hdr')
    //   //     //modal.document.body
    //   // );
    // });


    modal.addEventListener('DOMContentLoaded', function() {
      //console.log(this);
      this.console.log('Modal DOMContentLoaded', this);
      //this.document.body.innerHTML = '<div id="hdr"></div>';

      // copyStyles(document, this.document);

      // ReactDOM.render(
      //     <Header/>,
      //     //MyTestState,
      //     this.document.getElementById('hdr')
      //     //modal.document.body
      // );
    });

    // modal.document.addEventListener('load', (event) => {
    //   this.console.log('Modal document load', this);
    // });

    // modal.addEventListener('load', (event) => {
    //   this.console.log('Modal load', this);
    // });
  
    // modal.document.addEventListener('readystatechange', (event) => {
    //   this.console.log('Modal document readystatechange', this);
    // });

    // modal.addEventListener('readystatechange', (event) => {
    //   this.console.log('Modal readystatechange', this);
    // });

    // //window.open('https://github.com', '_blank', 'nodeIntegration=no')

    // let modal = window.open('', `modal-${this.state.modalsIndex++}`, 'width=300,height=250');

    // // modal.document.addEventListener( "DOMContentLoaded", function() {
    // //     modal.window.console.log('Modal reacdy');
    // // });

    // let newDiv = modal.document.createElement("div", { id: 'hdr'});

    // // console.log('new modal', modal);

    modal.document.write('<div id="hdr"></div>');
    //modal.write('<div id="hdr"></div>');
    // modal.document.body.appendChild(newDiv);
    copyStyles(document, modal.document);

    ReactDOM.render(
      MyTestState,
      modal.document.getElementById('hdr')
      //modal.document.body
    );

    //modal.window.setPointerCapture(pointer.pointerId);

    console.log('Finish modal');
  }

  render() {
    //window.open('https://github.com', '_blank', 'nodeIntegration=no')

    /*                <NewWindow title="Test" name="MyWindow">
                <h1>Hi π‘‹</h1>
            </NewWindow> */

    return (
      <div className={css(styles.appContainer)}>
        <div className="titleBarContainer">
        <TitleBar 
          icon={`./resources/icon.png`}
          app="Business Manager"
          theme={{
            barTheme: 'dark',
            barBackgroundColor: '#316d90',
            menuHighlightColor: '#2090ea',
            barShowBorder: true,
            barBorderBottom: '1px solid #1a70b7',
            menuDimItems: false,
            menuOverlayOpacity: 0.1
          }}
          menu={[
            {
              label: 'File',
              submenu: [
                {
                  label: 'Preferences...'
                },
                {
                  type: 'separator'
                },
                {
                  label: 'Exit'
                }
              ]
            },
            {
              label: 'View',
              submenu: [
                {
                  label: 'Actual Size',
                  accelerator: 'Ctrl+0'
                },
                {
                  label: 'Zoom In',
                  accelerator: 'Ctrl+Shift+='
                },
                {
                  label: 'Zoom Out',
                  accelerator: 'CtrlCtrl+-'
                },
                {
                  type: 'separator'
                },
                {
                  label: 'Toggle Full Screen',
                  accelerator: 'F11'
                },
                {
                  type: 'separator'
                },
                {
                  label: 'Debug Log'
                },
                {
                  label: 'Toggle Developer Tools',
                  accelerator: 'Ctrl+Shift+I'
                }
              ]
            },
            {
              label: 'Window',
              submenu: [
                {
                  label: 'Minimize',
                  accelerator: 'Ctrl+M'
                }
              ]
            },
            {
              label: 'Help',
              submenu: [
                {
                  label: 'Go to Release Notes'
                },
                {
                  type: 'separator'
                },
                {
                  label: 'Go to Forums'
                },
                {
                  label: 'Report An Issue'
                },
                {
                  type: 'separator'
                },
                {
                  label: 'About Signal Desktop'
                }
              ]
            }
          ]}
        />
        </div>
        <Header/>
        <div className={css(styles.contentFrameContainer)}>
          <SplitterLayout className={css(styles.sidebarSplitter)}
            //percentage
            //primaryMinSize={15}
            primaryIndex={1} 
            secondaryInitialSize={200}
            secondaryMinSize={150}

          >
            <SideNav/>
            <div style={{height: '100%'}}>
      <div className="chrome-tabs" style={styles.chromeTabs}>
        <div className="chrome-tabs-content">
        </div>
        <div className="chrome-tabs-bottom-bar"></div>
      </div>
      <div className="chrome-tabs-optional-shadow-below-bottom-bar"></div>
              <h4>Welcome to React, Electron and JS !! {Strings.Home}</h4>
              <pre>{
                  [platform.name,
                  platform.version,
                  platform.product,
                  platform.manufacturer,
                  platform.layout,
                  platform.os,
                  platform.description].join("\n")
              }</pre>
              <h3>CLI arguments</h3>
              <pre>{JSON.stringify(remote.process.argv, null, 2)}</pre>
              <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Check this custom checkbox" size='lg' />
              {MyTestState}
              <Button onClick={this.openPopup}>{"Open Modal!!!"}</Button>
              {/*<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>*/}
              {/*<iframe
                width="600"
                height="450"
                frameborder="0"
                style={{ width: '100%', height: '100%', border: 0}}
                src="https://www.google.com/maps/embed/v1/view?key=&zoom=12&center=37.9838%2C23.7275"
                allowfullscreen></iframe>
              */}
            </div>
          </SplitterLayout>
        </div>
        <Footer/>

      </div>
    );
  }
}

export default App;

const styles = StyleSheet.create({


  chromeTabs: {
    '--tab-content-margin': '9px'
  },

  googleIcon: {
    backgroundImage: 'url("https://adamschwartz.co/chrome-tabs/demo/images/google-favicon.ico")'
  },
  facebookIcon: {
    backgroundImage: 'url("https://adamschwartz.co/chrome-tabs/demo/images/facebook-favicon.ico")'
  },

  appContainer: {
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexFlow: 'column'
  },
  contentFrameContainer: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    //flexFlow: 'column',
    height: '100%'
  },
  sidebarSplitter: {
  }
});
