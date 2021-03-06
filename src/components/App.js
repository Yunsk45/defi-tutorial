import React, { Component } from 'react'
import Navbar from './Navbar'
import './App.css'
import Main from './Main.js'
import Main2 from './Main2.js'

import DaiToken from '../abis/DaiToken.json'
import DappToken from '../abis/DappToken.json'
import TokenFarm from '../abis/TokenFarm.json'
const Web3 = require("web3");


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      daiToken: {},
      dappToken: {},
      tokenFarm: {},
      daiTokenBalance: '0',
      dappTokenBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockChainData();
  }

  async loadBlockChainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    //console.log(accounts);
    this.setState({account:accounts[0]});

    const networkId = await web3.eth.net.getId();
    //console.log(networkId);

    //Load DaiToken
    const daiTokenData = DaiToken.networks[networkId];
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address);
      console.log("mDai token address", daiTokenData.address);
      this.setState({daiToken});
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call();
      this.setState({daiTokenBalance: daiTokenBalance.toString()});
    } else {
      window.alert("Dai Token contract not deployed to network");
    }

    //Load DappToken
    const dappTokenData = DappToken.networks[networkId];
    if(dappTokenData) {
      const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address);
      console.log("DApp token address", dappTokenData.address);
      this.setState({dappToken});
      let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call();
      this.setState({dappTokenBalance: dappTokenBalance.toString()});
    } else {
      window.alert("Dapp Token contract not deployed to network");
    }


    //Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId];
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address);
      this.setState({tokenFarm});
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call();
      this.setState({stakingBalance: stakingBalance.toString()});
    } else {
      window.alert("TokenFarm contract not deployed to network");
    }

    //Loading has ended
    this.setState({loading : false});

  }
  async loadWeb3() {
    if (window.ethereum) {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      return true;
    }
    return false;
  }

  stakeTokens = (amount) => {
    this.setState({loading: true});
    this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount)
      .send({from: this.state.account})
      .on('transactionHash', (hash) => {
        this.state.tokenFarm.methods.stakeTokens(amount).send({from: this.state.account })
        .on('transactionHash', (hash) => {
          this.setState({loading: false});
          this.loadBlockChainData();
        })
      }) 
  }

  unstakeTokens = (amount) => {
    this.setState({loading:true});
    this.state.tokenFarm.methods.unstakeTokens().send({from: this.state.account})
      .on("transactionHash", hash => {
        this.setState({loading: false});
        this.loadBlockChainData();
      })
  }
  faucet = (amount) => {
    this.setState({loading:true});
    this.state.daiToken.methods.faucet(amount).send({from: this.state.account})
      .on("transactionHash", hash => {
        this.setState({loading: false});
        this.loadBlockChainData();
      })
  }


  render() {
    let content, content2;
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
      content2 = null;
    } else {
      content = <Main 
      daiTokenBalance={this.state.daiTokenBalance}
      dappTokenBalance={this.state.dappTokenBalance}
      stakingBalance={this.state.stakingBalance}
      stakeTokens={this.stakeTokens}
      unstakeTokens={this.unstakeTokens}
      faucet={this.faucet}
      />
      content2 = <Main2
      daiTokenBalance={this.state.daiTokenBalance}
      dappTokenBalance={this.state.dappTokenBalance}
      stakingBalance={this.state.stakingBalance}
      faucet={this.faucet}
      />
    }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
              
                {content}
                {content2}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
