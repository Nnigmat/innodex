import { Text } from '@yandex/ui/Text/desktop/bundle';

import './Footer.css';

export function Footer() {
  return (
    <div className="Footer">
      <Text typography="body-short-m" weight="light" className="Footer-Freepik">
        Icons made by{' '}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </Text>
    </div>
  );
}
