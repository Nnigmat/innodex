import React, { useState, useContext } from 'react';
import web3 from 'web3';
import { useLocation } from 'react-router-dom';

import { Header as HeaderInner, HeaderNav } from '@yandex/ui/Header/desktop';
import { Text } from '@yandex/ui/Text';
import { compose } from '@bem-react/core';
import { Modal } from '@yandex/ui/Modal/desktop/bundle';
import { withZIndex } from '@yandex/ui/withZIndex';
import { Formik, Field, Form, FormikHelpers } from 'formik';

import { Logo } from './Logo';
import { NavItem } from './NavItem';
import { HeaderBalance } from './HeaderBalance';

import { UploadContext } from '../../context';

import './Header.css';
import { Button } from '@yandex/ui/Button/desktop/bundle';

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

export function Header({ aCoinBalance, nCoinBalance, account, orderBook }) {
  const location = useLocation();
  const upload = useContext(UploadContext);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <HeaderInner
      logo={<Logo />}
      actions={
        <HeaderBalance
          aCoinBalance={String(aCoinBalance)}
          nCoinBalance={String(nCoinBalance)}
          account={account}
        />
      }
    >
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
        <Button
          onClick={() => setModalVisible(true)}
          className="Link YandexHeader-NavLink"
        >
          Create order
        </Button>
      </HeaderNav>

      <Modal
        theme="normal"
        onClose={() => setModalVisible(false)}
        visible={modalVisible}
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
              await orderBook.methods
                .addOrder(
                  getRandomInt(10, 10e12),
                  values.orderType,
                  values.exRate,
                  web3.utils.toWei(String(values.amount), 'ether'),
                  values.coin
                )
                .send({ from: account });
              await upload();
              setModalVisible(false);
            }
          }}
        >
          {({ values }) => (
            <>
              <div className="Form-Header">Create order</div>
              <Form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 500,
                }}
                className="Form"
              >
                <label htmlFor="orderType" className="Form-Label">
                  Order type
                </label>
                <Field as="select" name="orderType" className="Form-Field">
                  <option value={OrderType.Sell}>Sell</option>
                  <option value={OrderType.Buy}>Buy</option>
                </Field>

                <label htmlFor="exRate" className="Form-Label">
                  <Text>Exchange rate</Text>
                </label>
                <Field
                  id="exRate"
                  name="exRate"
                  placeholder={1}
                  className="Form-Field"
                />

                <label htmlFor="amount" className="Form-Label">
                  <Text>Amount</Text>
                </label>
                <Field
                  id="amount"
                  name="amount"
                  placeholder={1}
                  className="Form-Field"
                />

                <label htmlFor="exRate" className="Form-Label">
                  <Text>Coin type</Text>
                </label>
                <Field as="select" name="coin" className="Form-Field">
                  <option value={Coin.A}>ACN</option>
                  <option value={Coin.N}>NCN</option>
                </Field>

                <Button type="submit" view="action" size="m">
                  Submit
                </Button>
              </Form>
            </>
          )}
        </Formik>
      </Modal>
    </HeaderInner>
  );
}
