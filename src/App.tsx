import { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { configureRootTheme } from '@yandex/ui/Theme';
import { theme } from '@yandex/ui/Theme/presets/default';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { BuyPage } from './pages/BuyPage';
import { SellPage } from './pages/SellPage';
import { HomePage } from './pages/HomePage';

import Web3 from 'web3';

import ACoin from './abis/ACoin.json';
import NCoin from './abis/NCoin.json';
import OrderBook from './abis/OrderBook.json';

import './App.css';

configureRootTheme({ theme });

export const App: FC = () => {
  const [account, setAccount] = useState<string>('');
  const [ACoinContract, setACoinContract] = useState<any>();
  const [NCoinContract, setNCoinContract] = useState<any>();
  const [orderBookContract, setOrderBookContract] = useState<any>();
  const [ACoinBalance, setACoinBalance] = useState<any>(0);
  const [NCoinBalance, setNCoinBalance] = useState<any>(0);
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();

    const aCoinData = ACoin.networks[networkId];
    if (ACoin) {
      let aCoinContract = new web3.eth.Contract(ACoin.abi, aCoinData.address);
      setACoinContract(aCoinContract);
      let aCoinBalance = await aCoinContract.methods
        .balanceOf(accounts[0])
        .call();
      setACoinBalance(aCoinBalance.toString());
    } else {
      window.alert('ACoin contract not deployed to detected network.');
    }

    const nCoinData = NCoin.networks[networkId];
    if (NCoin) {
      let nCoinContract = new web3.eth.Contract(NCoin.abi, nCoinData.address);
      setACoinContract(nCoinContract);
      let nCoinBalance = await nCoinContract.methods
        .balanceOf(accounts[0])
        .call();
      setNCoinBalance(nCoinBalance.toString());
    } else {
      window.alert('ACoin contract not deployed to detected network.');
    }

    const orderBookData = OrderBook.networks[networkId];
    if (orderBookData) {
      const orderBookContract = new web3.eth.Contract(
        OrderBook.abi,
        orderBookData.address
      );
      setOrderBookContract(orderBookContract);
      const _orders = (
        await orderBookContract.methods.getOrders().call()
      ).filter((it) => !it.isClosed);
      setOrders(_orders);
    } else {
      window.alert('OrderBook contract not deployed to detected network.');
    }

    setAccount(accounts[0]);
  };

  return (
    <div className="App">
      <Router>
        <Header
          account={account}
          aCoinBalance={ACoinBalance}
          nCoinBalance={NCoinBalance}
          orderBook={orderBookContract}
        />
        <div className="Content">
          <Switch>
            <Route path="/innodex/buy">
              <BuyPage
                orders={orders}
                completeOrder={orderBookContract?.methods.completeOrder}
                userId={account}
              />
            </Route>
            <Route path="/innodex/sell">
              <SellPage orders={orders} />
            </Route>
            <Route path="/innodex" exact>
              <HomePage />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
};
