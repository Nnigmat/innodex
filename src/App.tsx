import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { configureRootTheme } from '@yandex/ui/Theme';
import { theme } from '@yandex/ui/Theme/presets/default';

import { Header } from './components/Header';

import { BuyPage } from './pages/BuyPage';
import { SellPage } from './pages/SellPage';
import { HomePage } from './pages/HomePage';

import './App.css';

configureRootTheme({ theme });

export const App: FC = () => {
  return (
    <div className="App">
      <Router>
        <Header />
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
      </Router>
    </div>
  );
};
