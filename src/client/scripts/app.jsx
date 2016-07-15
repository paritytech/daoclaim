import styles from "../style.css";
import React from 'react';
import BigNumber from 'bignumber.js';
import {render} from 'react-dom';
import {web3} from './web3plus.jsx';
import {HexDump, Balance, InputBalance, TokenContractBalance, Account, AccountBalance} from './react-web3.jsx';
import {TotalDAOTokenBalance, DAOTokenBalance, InteractionConsole} from './react-dao.jsx';
import {Log} from './react-events.jsx';

/*dao.approve(withdrawable.address, dao.balanceOf(eth.accounts[0]), {from: eth.accounts[0]})
withdrawable.withdraw({from: eth.accounts[0], gas: 500000})*/

export var DAO = web3.eth.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Approval","type":"event"}]);
export var Withdrawable = web3.eth.contract([{"constant":false,"inputs":[],"name":"trusteeWithdraw","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"mainDAO","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"trustee","outputs":[{"name":"","type":"address"}],"type":"function"}]);

// Approval(_owner, _spender, _value)

export class App extends React.Component {
	constructor() {
		super();
		this.state = {
			allUserAccounts: []
		};
		setInterval(this.checkUserAddresses.bind(this), 500);
	}

	checkUserAddresses() {
		var a = web3.eth.accounts;
		if (a != this.state.allUserAccounts) {
			this.setState({
				allUserAccounts: a
			});
		}
	}
	
	render() {
		var theDAO = DAO.at(this.props.dao);
		var theWithdraw = Withdrawable.at(this.props.withdraw);
		var allUserAccounts = this.state.allUserAccounts;
		return <div id="app">
			<div id="youhave">You have <DAOTokenBalance address={allUserAccounts} contract={theDAO} /> to be claimed!</div>
			<InteractionConsole user={allUserAccounts} dao={theDAO} withdraw={theWithdraw}/>
			<div id="extrainfo"><span>DAO contract address: <Account addr={this.props.dao} /> | Withdraw contract address: <Account addr={this.props.withdraw} /></span></div>
		</div>;
	}
}

// for debug console happiness.
window.web3 = web3;
window.DAO = DAO;
window.Withdrawable = Withdrawable;
