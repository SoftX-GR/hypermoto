import React, { useState } from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

import '../styles/main.css';
import '../styles/test.css';

library.add(faIgloo)

//const isDev = require('electron-is-dev');

import isDev from 'electron-is-dev';

// if (isDev) {
// 	console.log('Running in development');
// } else {
// 	console.log('Running in production');
// }

export default Application = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p className="my-paragraph">React here!! ({isDev ? "DEV" : "PROD"})</p>
      <div className="test-par">Counter: <span>{count}</span></div>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <div>
        Favorite Food: <FontAwesomeIcon icon="igloo" />
      </div>
    </div>
  );
};
