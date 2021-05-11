import sellerSrc from '../../assets/seller.svg';
import moneySrc from '../../assets/money.svg';
import limitSrc from '../../assets/limit.svg';

export function ListHeader() {
  return (
    <div className="ListHeader">
      <div className="ListHeader-Seller">
        <img src={sellerSrc} alt="Seller" />
        Seller
      </div>
      <div className="ListHeader-Exchange">
        <img src={moneySrc} alt="Price" />
        Exchange rate
      </div>
      <div className="ListHeader-Coin">
        <img src={moneySrc} alt="Price" />
        Coin
      </div>
      <div className="ListHeader-Amount">
        <img src={limitSrc} alt="Amount" />
        Amount
      </div>
      <div className="ListHeader-Action"></div>
    </div>
  );
}
