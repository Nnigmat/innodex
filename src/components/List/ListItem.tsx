import { useContext } from 'react';
import { Text } from '@yandex/ui/Text';
import { Button } from '@yandex/ui/Button/desktop/bundle';
import web3 from 'web3';

import { UploadContext } from '../../context';

export type ListItemProps = {
  owner: string;
  exchange: number;
  orderType: number;
  originalAmount: number;
  buyerGet: number;
};

export function ListItem({
  owner,
  exchange,
  orderType,
  originalAmount,
  id,
  completeOrder,
  userId,
}: any) {
  const upload = useContext(UploadContext);
  const buyItem = async (id, amount) => {
    await completeOrder(id, amount).send({ from: userId });
    await upload();
  };

  return (
    <div className="ListItem">
      <div className="ListItem-Seller">
        <Text overflow="ellipsis">{owner}</Text>
      </div>
      <div className="ListItem-Exchange">
        <Text>{exchange}</Text>
      </div>
      <div className="ListItem-Coin">
        <Text>{orderType === 1 ? 'NCN' : 'ACN'}</Text>
      </div>
      <div className="ListItem-Amount">
        <Text>{web3.utils.fromWei(originalAmount, 'ether')}</Text>
      </div>
      <div className="ListItem-Action">
        <Button
          view="action"
          size="m"
          onClick={() => buyItem(id, originalAmount)}
        >
          Buy
        </Button>
      </div>
    </div>
  );
}
