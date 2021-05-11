import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Header as HeaderInner, HeaderNav } from '@yandex/ui/Header/desktop';
import { compose } from '@bem-react/core';
import {
  Modal as ModalDesktop,
  withThemeNormal,
} from '@yandex/ui/Modal/desktop';
import { withZIndex } from '@yandex/ui/withZIndex';
import { Formik, Field, Form, FormikHelpers } from 'formik';

import { Logo } from './Logo';
import { NavItem } from './NavItem';

import './Header.css';
import { Button } from '@yandex/ui/Button';

const Modal = compose(withThemeNormal, withZIndex)(ModalDesktop);
enum Coin {
  A,
  N,
}
enum OrderType {
  Sell,
  Buy,
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function Header(props) {
  const { aCoinBalance, nCoinBalance, account, orderBook } = props;
  const location = useLocation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <HeaderInner logo={<Logo />}>
      <HeaderNav>
        <NavItem
          to="/innodex/buy"
          active={Boolean(location.pathname.match('/innodex/buy'))}
        >
          Buy
        </NavItem>
        <NavItem
          to="/innodex/sell"
          active={Boolean(location.pathname.match('/innodex/sell'))}
        >
          Sell
        </NavItem>
        <Button onClick={() => setModalVisible(true)}>Create order</Button>
        {'A Coin:' + aCoinBalance / 10e18}
        {' N Coin:' + nCoinBalance / 10e18}
        {' Address' + account}
      </HeaderNav>

      <Modal
        theme="normal"
        onClose={() => setModalVisible(false)}
        visible={modalVisible}
        zIndexGroupLevel={20}
      >
        <Formik
          initialValues={{
            orderType: OrderType.Sell,
            exRate: 1,
            amount: 1,
            coin: Coin.A,
          }}
          onSubmit={async (values: any) => {
            if (orderBook) {
              console.log(orderBook.methods, orderBook);
              await orderBook.methods
                .addOrder(
                  getRandomInt(10, 10e12),
                  values.orderType,
                  values.exRate,
                  values.amount,
                  values.coin,
                  values.coin == Coin.A ? Coin.N : Coin.A
                )
                .send({ from: account });
            }
          }}
        >
          {({ values }) => (
            <Form style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="orderType">Order type</label>
              <Field as="select" name="orderType">
                <option value={OrderType.Sell}>Sell</option>
                <option value={OrderType.Buy}>Buy</option>
              </Field>

              <label htmlFor="exRate">Exchange rate</label>
              <Field id="exRate" name="exRate" placeholder={1} />

              <label htmlFor="amount">Amount</label>
              <Field id="amount" name="amount" placeholder={1} />

              <label htmlFor="exRate">Coin type</label>
              <Field as="select" name="coin">
                <option value={Coin.A}>A</option>
                <option value={Coin.N}>N</option>
              </Field>

              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </HeaderInner>
  );
}
