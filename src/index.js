import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/app.main';
import * as db from './app/api/db';

db.init();

ReactDOM.render(<App />, document.getElementById('root'));
