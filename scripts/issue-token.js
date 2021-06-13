
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(callback) {
  
  let tokenFarm = await TokenFarm.deployed();

  await tokenFarm.issueTokens();

  console.log("Token issued");
  console.log(tokenFarm.address);

  callback();

};
