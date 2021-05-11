const ACoin = artifacts.require('ACoin');
const NCoin = artifacts.require('NCoin');
const OrderBook = artifacts.require('OrderBook');

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(ACoin);
  const acoin = await ACoin.deployed();

  await deployer.deploy(NCoin);
  const ncoin = await NCoin.deployed();

  await deployer.deploy(OrderBook, acoin.address, ncoin.address);
  const orderBook = await OrderBook.deployed();
};
