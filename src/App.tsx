import { FC, useEffect, useState, useContext } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { configureRootTheme } from '@yandex/ui/Theme';
import { Text } from '@yandex/ui/Text/desktop/bundle';
import { theme } from '@yandex/ui/Theme/presets/default';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { BuyPage } from './pages/BuyPage';
import { SellPage } from './pages/SellPage';
import { HomePage } from './pages/HomePage';

import ACoin from './abis/ACoin.json';
import NCoin from './abis/NCoin.json';
import OrderBook from './abis/OrderBook.json';

import { UploadContext } from './context';

import './App.css';

configureRootTheme({ theme });

export const App: FC = () => {
  const [account, setAccount] = useState<string>('');
  const [hasMetamask, setHasMetamask] = useState(true);
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
      setHasMetamask(false);
    }
  };

  const loadBlockchainData = async () => {
    if (!window.web3) {
      return;
    }
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

  if (!hasMetamask) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Text
          typography="display-s"
          weight="light"
          style={{ marginBottom: 10 }}
        >
          No metamask installed
        </Text>
        <iframe
          width="1200"
          height="615"
          src="https://www.youtube.com/embed/CgXQC4dbGUE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <UploadContext.Provider value={loadBlockchainData}>
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
                <SellPage
                  orders={orders}
                  completeOrder={orderBookContract?.methods.completeOrder}
                  userId={account}
                />
              </Route>
              <Route path="/innodex" exact>
                <HomePage />
              </Route>
            </Switch>
          </div>
          <Footer />
        </Router>
      </div>
    </UploadContext.Provider>
  );
};
