const ACoin = artifacts.require('ACoin');
const NCoin = artifacts.require('NCoin');
const OrderBook = artifacts.require('OrderBook');

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(ACoin);
  const acoin = await ACoin.deployed();

  await deployer.deploy(NCoin);
  const ncoin = await NCoin.deployed();

  // give all user 100 Acoin and 100 Ncoin
  accounts.forEach(async (address) => {
    await acoin.transfer(address, '100000000000000000000'); // 100 coins
    await ncoin.transfer(address, '100000000000000000000');
  });

  await deployer.deploy(OrderBook, acoin.address, ncoin.address);
  const orderBook = await OrderBook.deployed();
};
