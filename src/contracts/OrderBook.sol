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
    Order newOrder;
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
        newOrder =
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
        if(!this.matchOrders())
        {
            orders.push(newOrder);
        }
        else
        {
            newOrder.isClosed = true;
        }

    }

    function completeOrder(uint256 _id, uint256 _amount) external payable returns (bool) {
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

        return true;
    }

    function closeOrder(uint256 _id) external payable{
        require(this.orderExist(_id), "order id not exist!");
        Order memory order = this.getOrder(_id);
        order.isClosed = true;
    }

    function matchOrders() public payable returns(bool) {
        if(newOrder.isClosed)
        {
            return false;
        }

        for (uint256 i = 0; i < orders.length; i++) {
            if (!orders[i].isClosed) {
                if(newOrder.ownerGet == orders[i].buyerGet)
                {
                    // found order with lower exchange rate
                    if(newOrder.exchange >= orders[i].exchange)
                    {
                        uint256 minAmount = newOrder.amount > orders[i].amount ? orders[i].amount : newOrder.amount;
                        if(this.completeOrder(orders[i].id, minAmount))
                        {
                            newOrder.amount -= minAmount;
                        }
                        if(newOrder.amount == 0)
                        {
                            break;
                        }
                    }
                }
            }
        }

        return newOrder.amount == 0;
    }
}
