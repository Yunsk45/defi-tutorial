import React, { Component } from 'react';
import dai from "../dai.png";

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">


           <div className="card mb-4">
              <div className="card-body">
                  <label className="float-left"><b>mDai Faucet</b></label>
                <form className="mb-3" onSubmit={(event) => {
                  event.preventDefault();
                  let amount2;
                  amount2 = this.input.value.toString();
                  amount2 = window.web3.utils.toWei(amount2, 'Ether');
                  this.props.faucet(amount2);
                }
                }>

              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={dai} height='32' alt=""/>
                    &nbsp;&nbsp;&nbsp; mDAI
                  </div>
                </div>
                </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">
                Request mDai Tokens
              </button>
            </form>
            </div>
            </div>
        </div>
    );
  }
}

export default Main;
