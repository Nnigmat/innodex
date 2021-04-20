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
      <div className="ListHeader-Price">
        <img src={moneySrc} alt="Price" />
        Price
      </div>
      <div className="ListHeader-Limits">
        <img src={limitSrc} alt="Limits" />
        Limits
      </div>
      <div className="ListHeader-Action"></div>
    </div>
  );
}
