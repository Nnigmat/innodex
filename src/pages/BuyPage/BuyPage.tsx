import { Text } from '@yandex/ui/Text/desktop/bundle';
import { useEffect, useState } from 'react';

import { List, ListItem, ListItemProps } from '../../components/List';
import { useTitle } from '../../hooks/useTitle';

import './BuyPage.css';

export function BuyPage(props) {
  const { orders } = props;

  useTitle('Buy - InnoDEX');

  return (
    <div className="BuyPage">
      <Text typography="display-s" weight="light" className="BuyPage-Title">
        Buy cryptocurrencies online
      </Text>

      <br />
      <br />

      {orders.length !== 0 ? (
        <List>
          {orders
            .filter((it) => it.orderType == 1)
            .map((item) => (
              <ListItem {...item} />
            ))}
        </List>
      ) : (
        <div className="BuyPage-NoOffers">
          <Text color="secondary"> There is no offers yet </Text>
        </div>
      )}
    </div>
  );
}
