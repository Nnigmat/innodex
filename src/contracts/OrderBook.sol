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
        uint256 originalAmount;
        Coin ownerGet;
        Coin buyerGet;
        address owner;
        bool isClosed;
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

        revert("order id not exist!");
    }

    function getOrders() external view returns (Order[] memory) {
        return orders;
    }

    function addOrder(uint256 _id, OrderType _orderType, uint256 _exchange, uint256 _amount, Coin _ownerGet, Coin _buyerGet) external payable {
        require(!this.orderExist(_id), "order id exist!");
        Order memory order =
            Order({
                id: _id,
                orderType: _orderType,
                exchange: _exchange,
                amount: _amount,
                originalAmount: _amount,
                ownerGet: _ownerGet,
                buyerGet: _buyerGet,
                owner: msg.sender,
                isClosed: false
            });
        orders.push(order);
    }

    function completeOrder(uint256 _id, uint256 _amount) external payable {
        require(this.orderExist(_id), "order id not exist!");

        Order memory order = this.getOrder(_id);
        require(!order.isClosed, "order already closed!");
        require(order.amount >= _amount, "not enough coins in order!");

        uint256 price = _amount * order.exchange;
        uint256 wallet = order.buyerGet == Coin.A ? acoin.balanceOf(msg.sender) : ncoin.balanceOf(msg.sender);
        require(price <= wallet, "not enought coins in buyer!");

        order.amount -= _amount;
        if(order.buyerGet == Coin.A)
        {
            acoin.transferFrom(order.owner, msg.sender, _amount);
            ncoin.transferFrom(msg.sender, order.owner, price);
        }
        else
        {
            ncoin.transferFrom(order.owner, msg.sender, _amount);
            acoin.transferFrom(msg.sender, order.owner, price);
        }

        if(order.amount == 0)
        {
            this.closeOrder(_id);
        }
    }

    function closeOrder(uint256 _id) external payable{
        require(this.orderExist(_id), "order id not exist!");
        Order memory order = this.getOrder(_id);
        order.isClosed = true;
    }
}
