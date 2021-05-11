import { Text } from '@yandex/ui/Text/desktop/bundle';
import { useEffect, useState, useContext } from 'react';

import { List, ListItem, ListItemProps } from '../../components/List';
import { useTitle } from '../../hooks/useTitle';
import { UploadContext } from '../../context';

import './BuyPage.css';

export function BuyPage({ orders, completeOrder, userId }) {
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
              <ListItem
                {...item}
                completeOrder={completeOrder}
                userId={userId}
              />
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
