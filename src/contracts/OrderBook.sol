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
        uint256 priceOfOne;
        uint256 amount;
        uint256 originalAmount;
        Coin ownerHave;
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

    function addOrder(uint256 _id, OrderType _orderType, uint256 _priceOfOne, uint256 _amount, Coin _ownerHave) external payable {
        require(!this.orderExist(_id), "order id exist!");
        Order memory order =
            Order({
                id: _id,
                orderType: _orderType,
                priceOfOne: _priceOfOne,
                amount: _amount,
                originalAmount: _amount,
                ownerHave: _ownerHave,
                owner: msg.sender,
                isClosed: false
            });
        
        orders.push(order);
    }

    function completeOrder(uint256 _id, uint256 _amount) external payable {
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].id == _id) {
                Order storage order = orders[i];
                require(!order.isClosed, "order already closed!");
                require(order.amount >= _amount, "not enough coins in order!");

                uint256 price = _amount * order.priceOfOne;
                uint256 wallet = order.ownerHave == Coin.N ? acoin.balanceOf(msg.sender) : ncoin.balanceOf(msg.sender);
                require(price <= wallet, "not enought coins in buyer!");

                if(order.ownerHave == Coin.A)
                {
                    acoin.transfer(msg.sender, _amount);
            
                    ncoin.transfer(order.owner, price);
                }
                else
                {
                    ncoin.transfer(msg.sender, _amount);
            
                    acoin.transfer(order.owner, price);
                }
        
                order.amount -= _amount;
                if(order.amount == 0)
                {
                    order.isClosed = true;
                }
                return;
            }
        }

        revert("order id not exist!");
    }
}
