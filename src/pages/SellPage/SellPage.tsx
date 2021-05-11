import { Text } from '@yandex/ui/Text/desktop/bundle';

import { useTitle } from '../../hooks/useTitle';

import './SellPage.css';

export function SellPage(props) {
  useTitle('Sell - InnoDEX');

  return (
    <div className="SellPage">
      <Text typography="display-s" weight="light" className="BuyPage-Title">
        Sell cryptocurrency
      </Text>
    </div>
  );
}
