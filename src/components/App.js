import React, { Component } from 'react'
import Navbar from './Navbar'
import './App.css'

import DaiToken from '../abis/DaiToken.json'
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
    console.log(networkId);

    //Load DaiToken
    const daiTokenData = DaiToken.networks[networkId];
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address);
      this.setState({daiToken});
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call();
      this.setState({daiTokenBalance: daiTokenBalance.toString()});
    } else {
      window.alert("Dai Token contract not deployed to network");
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      return true;
    }
    return false;
  }


  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                <h1>Hello, World!</h1>

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
