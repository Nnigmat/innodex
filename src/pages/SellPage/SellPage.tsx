import { Text } from '@yandex/ui/Text/desktop/bundle';

import { List, ListItem, ListItemProps } from '../../components/List';
import { useTitle } from '../../hooks/useTitle';

import './SellPage.css';

export function SellPage({ orders, completeOrder, userId }) {
  useTitle('Sell - InnoDEX');

  return (
    <div className="SellPage">
      <Text typography="display-s" weight="light" className="SellPage-Title">
        Sell cryptocurrencies online
      </Text>

      <br />
      <br />

      {orders.length !== 0 ? (
        <List>
          {orders
            .filter((it) => it.orderType == 0)
            .map((item) => (
              <ListItem
                {...item}
                completeOrder={completeOrder}
                userId={userId}
              />
            ))}
        </List>
      ) : (
        <div className="SellPage-NoOffers">
          <Text color="secondary"> There is no offers yet </Text>
        </div>
      )}
    </div>
  );
}
