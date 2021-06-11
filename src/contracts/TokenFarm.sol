pragma solidity ^0.5.0;

import "./DaiToken.sol";
import "./DappToken.sol";

contract TokenFarm {
   string public name = "DApp Token Farm";
   DappToken public dappToken;
   DaiToken public daiToken;

   mapping(address => uint) public stakingBalance;
   mapping(address => bool) public hasStaked;
   mapping(address => bool) public isStaking;
   address[] public stakers;

   constructor(DappToken _dappToken, DaiToken _daiToken) public {
      dappToken = _dappToken;
      daiToken = _daiToken;
  }


  // Staking
  function stakeTokens(uint _amount) public {

     daiToken.transferFrom(msg.sender, address(this), _amount);

     stakingBalance[msg.sender] += _amount;

     if(!hasStaked[msg.sender]) {
        stakers.push(msg.sender);
     } 
     hasStaked[msg.sender] = true;
     isStaking[msg.sender] = true;
  }

  // Unstaking

  // Issuance
}
