pragma solidity ^0.5.0;

import "./DaiToken.sol";
import "./DappToken.sol";

contract TokenFarm {
   string public name = "DApp Token Farm";
   DappToken public dappToken;
   DaiToken public daiToken;

   address public owner;

   mapping(address => uint) public stakingBalance;
   mapping(address => bool) public hasStaked;
   mapping(address => bool) public isStaking;
   address[] public stakers;

   constructor(DappToken _dappToken, DaiToken _daiToken) public {
      dappToken = _dappToken;
      daiToken = _daiToken;
      
      owner = msg.sender;
  }


   // Staking
   function stakeTokens(uint _amount) public {
      require(_amount >0, "Staking amounts cannot be 0.");

     daiToken.transferFrom(msg.sender, address(this), _amount);
     stakingBalance[msg.sender] += _amount;

     if(!hasStaked[msg.sender]) {
        stakers.push(msg.sender);
     } 
     hasStaked[msg.sender] = true;
     isStaking[msg.sender] = true;
  }

   // Issuance
   function issueTokens() public onlyOwner {
      for (uint i=0; i<stakers.length; i++) {
         address recipient = stakers[i];
         uint balance = stakingBalance[recipient];
         if(balance > 0) {
            dappToken.transfer(recipient, balance);
         }
      }
   }
   
   modifier onlyOwner {
      require(msg.sender == owner);
      _;
   }
   // Unstaking

}
