pragma solidity ^0.5.0;

import "./ACoin.sol";
import "./NCoin.sol";

contract OrderBook {
    ACoin public acoin;
    NCoin public ncoin;
    address public owner;

    enum Coin{A, N}
    enum OrderType {Sell, Buy}

    struct Order {
        OrderType orderType;
        uint256 exchange;
        Coin fromCoin;
        Coin toCoin;
        address owner;
    }

    constructor(ACoin _acoin, NCoin _ncoin) public {
        acoin = _acoin;
        ncoin = _ncoin;
        owner = msg.sender;
    }
}
