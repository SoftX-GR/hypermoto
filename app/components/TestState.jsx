import React, { useState } from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo)

//const isDev = require('electron-is-dev');

import isDev from 'electron-is-dev';

//import Store from './Store';

// export default class TestState extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             count: 0
//         }
//     }

//     setCount(val) {
//         this.setState({ count: val });
//     }

//     render() {
//         const { count } = this.state;
//         return (
//             <div>
//                 <p className="my-paragraph">Test Sate !! ({isDev ? "DEV" : "PROD"})</p>
//                 <div className="test-par">Counter: <span>{count}</span></div>
//                 <button onClick={() => this.setCount(count + 1)}>Add</button>
//                 <div>
//                     Favorite Food: <FontAwesomeIcon icon="igloo" />
//                 </div>
//             </div>
//         );
//     }
// }

// if (isDev) {
// 	console.log('Running in development');
// } else {
// 	console.log('Running in production');
// }

export default (props) => {
  const [count, setCount] = useState(0);
  //const [store, setStore] = useState(props.store);

  //console.log('store', store);

  return (
    <div>
      <p className="my-paragraph">Test Sate !! ({isDev ? "DEV" : "PROD"})</p>
      <div className="test-par">Counter: <span>{count}</span></div>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <div>
        Favorite Food: <FontAwesomeIcon icon="igloo" />
      </div>
    </div>
  );
};
