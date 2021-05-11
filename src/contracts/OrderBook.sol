pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./ACoin.sol";
import "./NCoin.sol";

contract OrderBook {
    ACoin acoin;
    NCoin ncoin;
    address owner;

    enum Coin{A, N}
    enum OrderType {Sell, Buy}

    struct Order {
        uint256 id;
        OrderType orderType;
        uint256 exchange;
        uint256 amount;
        Coin fromCoin;
        Coin toCoin;
        address owner;
    }

    Order[] orders;

    constructor(ACoin _acoin, NCoin _ncoin) public {
        acoin = _acoin;
        ncoin = _ncoin;
        owner = msg.sender;
    }

    function orderExist(uint256 _id) external view returns (bool)
    {
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].id == _id) {
                return true;
            }
        }
        return false;
    }

    function getOrder(uint256 _id) external view returns (Order memory) {
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].id == _id) {
                return orders[i];
            }
        }

        revert("current id not exist!");
    }

    function getOrders() external view returns (Order[] memory) {
        return orders;
    }

    function addOrder(uint256 _id, OrderType _orderType, uint256 _exchange, uint256 _amount, Coin _from, Coin _to) external payable {
        require(!this.orderExist(_id), "current id exist!");
        Order memory order =
            Order({
                id: _id,
                orderType: _orderType,
                exchange: _exchange,
                amount: _amount,
                fromCoin: _from,
                toCoin: _to,
                owner: msg.sender
            });
        orders.push(order);
    }

    function completeOrder(uint256 _id) external payable {
        require(this.orderExist(_id), "current id not exist!");

    }
}
