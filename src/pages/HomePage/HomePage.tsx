import { Text } from '@yandex/ui/Text/desktop/bundle';

import './HomePage.css';

export function HomePage() {
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
