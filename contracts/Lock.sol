// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;
// Todo: Add a constructor that takes a uint for the unlock time and an address for the owner
    event Withdrawal(uint amount, uint when);
    
}
