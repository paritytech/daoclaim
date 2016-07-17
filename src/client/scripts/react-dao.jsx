import React from 'react';
import {render} from 'react-dom';
import BigNumber from 'bignumber.js';
import {InputBalance, Balance} from './react-web3.jsx';
import {ConfirmEvent} from './react-events.jsx';

/*export class Withdraw extends React.Component {
	render() {
		return (
			<ConfirmEvent confirmed={this.props.confirmed} cardClass="withdraw">
				<div className="card-label">withdraw</div>
				<Balance value={this.props.args.amount} /> (returned <Balance value={this.props.args.returned} />)
			</ConfirmEvent>
		);
	}
}*/

export class InteractionConsole extends React.Component {
	constructor() {
		super();
		this.withdraw = this.withdraw.bind(this);
	}

	withdraw() {
		let accounts = typeof this.props.user == 'object' ? this.props.user : [this.props.user];
		accounts.forEach(addr => {
			var b = this.props.dao.balanceOf(addr);
			if (+b > new BigNumber(0)) {
				if (+web3.eth.getBalance(addr) > 0) {
					this.props.dao.approve(this.props.withdraw.address, b, {from: addr}, (e, r) => {
						console.log("e=" + JSON.stringify(e) + "; r=" + JSON.stringify(r));
						if (e) {
							alert("Error authorising DAO token transfer!" + e);
						} else {
							this.props.withdraw.withdraw({from: addr, gas: 500000}, (e, r) => {
								if (e) {
									alert("Error withdrawing!" + e);
								} else {
									// all good!
									alert("All good!");
								}
							});
						}
					});
					
				} else {
					alert("Cannot afford to get refund for address " + addr + ". Ensure there is at least 0.001 ETH in the account.");
				}
			}
		});
	}

	render () {
		return <a href="#" className="button" onClick={this.withdraw}><span><img src="giveme.png" alt="Claim!" /></span></a>;
	}
}

export class DAOTokenBalance extends React.Component {
	constructor() {
		super();
		this.state = { balance: new BigNumber(0) };
	}

	updateState(props) {
		this.setState({
			balance: typeof props.address == "object" ?
				props.address.map(addr => props.contract.balanceOf(addr)).reduce((p, c) => p.add(c), new BigNumber(0)) :
				props.contract.balanceOf(props.address)
		});
	}

	componentWillMount(props) {
		var props = props || this.props;
		this.filter = props.contract.allEvents({fromBlock: 'latest', toBlock: 'pending'});
		this.filter.watch(() => this.updateState(this.props));
		this.updateState(props);
	}

	componentWillUnmount() {
		this.filter.stopWatching();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.contract.address !== this.props.contract.address) {
			this.componentWillUnmount();
			this.componentWillMount(nextProps);
			this.updateState(nextProps);
		}
		else if (nextProps.address !== this.props.address)
			this.updateState(nextProps);
	}

	render() { return <DAOBalance value={this.state.balance} />; }
}

export class DAOBalance extends React.Component {
	render () {
		var a = new BigNumber(this.props.value).div(new BigNumber("10000000000000000"));
		return (
			<span className={'_balance _dao'}>
				{'' + a}
				<span className="_denom">
					DAO
				</span>
			</span>
		);
	}
} 
/*
export class DAOStatus extends React.Component {
	constructor() {
		super();
	}

	updateState() {
	}

	componentWillMount() {
		this.filter = this.props.dao.allEvents({fromBlock: 'latest', toBlock: 'pending'});
		this.filter.watch(this.updateState.bind(this));
		// TODO: this should get called anyway.
		this.updateState();
	}

	componentWillUnmount() {
		this.filter.stopWatching();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.dao.address !== this.props.dao.address) {
			this.componentWillUnmount();
			this.componentWillMount();
		}
	}

	render() {	
		return <span></span>;
	}
}
*/