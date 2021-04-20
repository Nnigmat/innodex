import { Text } from '@yandex/ui/Text';
import { Button } from '@yandex/ui/Button/desktop/bundle';

export type ListItemProps = {
  seller: string;
  price: number;
  limits: [number, number];
};

export function ListItem({ seller, price, limits }: ListItemProps) {
  return (
    <div className="ListItem">
      <div className="ListItem-Seller">
        <Text overflow="ellipsis">{seller}</Text>
      </div>
      <div className="ListItem-Price">
        <Text>{price}</Text>
      </div>
      <div className="ListItem-Limits">
        <Text>{`${limits[0]}-${limits[1]}`}</Text>
      </div>
      <div className="ListItem-Action">
        <Button view="action" size="m">
          Buy
        </Button>
      </div>
    </div>
  );
}
