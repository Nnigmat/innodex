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

import './App.css';

configureRootTheme({ theme });

export const App: FC = () => {
  const [account, setAccount] = useState<string>('');

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

    setAccount(accounts[0]);
  };

  return (
    <div className="App">
      <Router>
        <Header account={account} />
        <div className="Content">
          <Switch>
            <Route path="/innodex/buy">
              <BuyPage />
            </Route>
            <Route path="/innodex/sell">
              <SellPage />
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
