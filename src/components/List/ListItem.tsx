import { Text } from '@yandex/ui/Text';
import { Button } from '@yandex/ui/Button/desktop/bundle';

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
  const buyItem = (id, amount) => {
    completeOrder(id, amount).send({ from: userId });
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
        <Text>{originalAmount}</Text>
      </div>
      <div className="ListItem-Action">
        <Button view="action" size="m" onClick={() => buyItem(id, 1)}>
          Buy
        </Button>
      </div>
    </div>
  );
}
