import { Text } from '@yandex/ui/Text/desktop/bundle';

import { List, ListItem, ListItemProps } from '../../components/List';

import './BuyPage.css';

const testData = [
  { seller: 'Nikita Nigmatullin', price: 5000, limits: [1000, 3000] },
  { seller: 'Amir Subaev', price: 3000, limits: [4000, 10000] },
  { seller: 'Salavat Dinmukhametov', price: 4000, limits: [2000, 3000] },
] as ListItemProps[];

export function BuyPage() {
  return (
    <div className="BuyPage">
      <Text typography="display-s" weight="light" className="BuyPage-Title">
        Buy cryptocurrencies online
      </Text>

      <List>
        {testData.map((item) => (
          <ListItem {...item} />
        ))}
      </List>
    </div>
  );
}
