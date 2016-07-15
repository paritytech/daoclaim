import 'jquery';
import React from 'react';
import {render} from 'react-dom';
import {App} from './app.jsx'

render(<App dao="0xbb9bc244d798123fde783fcc1c72d3bb8c189413" withdraw="0xbf4ed7b27f1d666546e30d74d50d173d20bca754"/>, document.getElementById('app'));
