import 'jquery';
import React from 'react';
import {render} from 'react-dom';
import {App} from './app.jsx'
import {web3} from './web3plus.jsx';

if (+web3.eth.getBalance('0x7deBEFD57d9BF7aA8af74AB62Ac629f5a8a09694') > 0) {
	render(<App dao="0x7deBEFD57d9BF7aA8af74AB62Ac629f5a8a09694" withdraw="0xd89bfE6C0F3747163db598A1C316C997fC91D113"/>, document.getElementById('app'));
} else {
	render(<App dao="0xbb9bc244d798123fde783fcc1c72d3bb8c189413" withdraw="0xbf4ed7b27f1d666546e30d74d50d173d20bca754"/>, document.getElementById('app'));
}