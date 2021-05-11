import { useState, useRef } from 'react';
import web3 from 'web3';

import { Text } from '@yandex/ui/Text';
import { Textinput } from '@yandex/ui/TextInput/desktop/bundle';
import { Modal } from '@yandex/ui/Modal/desktop/bundle';
import { Button } from '@yandex/ui/Button/desktop/bundle';

export function HeaderBalance({ aCoinBalance, nCoinBalance, account }) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const aCoinEther = web3.utils.fromWei(aCoinBalance, 'ether');
  const nCoinEther = web3.utils.fromWei(nCoinBalance, 'ether');

  const aCoinFormat =
    aCoinEther.split('.')[0] + '.' + aCoinEther.split('.')[1]?.substr(0, 5);
  const nCoinFormat =
    nCoinEther.split('.')[0] + '.' + nCoinEther.split('.')[1]?.substr(0, 5);

  const handleClose = () => setVisible(false);
  const handleClick = () => setVisible(true);

  return (
    <div className="HeaderBalance" ref={scopeRef}>
      <Text as="div" className="HeaderBalance-Text">
        ACN&nbsp;Balance:&nbsp;{aCoinFormat}
      </Text>
      <Text as="div" className="HeaderBalance-Text">
        NCN&nbsp;Balance:&nbsp;{nCoinFormat}
      </Text>
      <Button
        view="action"
        size="m"
        onClick={handleClick}
        className="Button_Gradient"
      >
        {account.substring(0, 6) +
          '..' +
          account.substring(account.length - 4, account.length)}
      </Button>
      <Modal
        theme="normal"
        scope={scopeRef}
        visible={visible}
        onClose={handleClose}
      >
        <div className="HeaderBalance-Modal-Content">
          <Text as="div">Account address:</Text>
          <Textinput value={account} view="default" size="m" disabled />
        </div>
      </Modal>
    </div>
  );
}
