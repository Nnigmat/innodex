import { Text } from '@yandex/ui/Text/desktop/bundle';

import { useTitle } from '../../hooks/useTitle';

import './HomePage.css';

export function HomePage() {
  useTitle('Home - InnoDEX');

  return (
    <div className="SellPage">
      <Text typography="display-s" weight="light" className="BuyPage-Title">
        Home page
      </Text>

      <br />
      <br />

      <Text typography="display-s" weight="light">
        This is the InnoDEX project. Which is a distributed cryptocurrency
        exchange.
      </Text>
    </div>
  );
}
