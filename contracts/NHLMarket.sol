//TODO: NHLMarket implementation
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzepplin/contracts/utils/Counters.sol";
import "@openzepplin/contracts/token/ERC721/ERC721.sol";
import "@openzepplin/contracts/security/ReentracncyGuard.sol";
//*Security mechanism that gives us a utility called non-Reentrant which will allow us to protect certian txns 
//*that are interacting with certian contracts ro protect someone hitting this with multipple attempts at the txn, 
//*and doing shady things to prevent reentrancy attacks

//Todo: Declare the contract
//Todo: Declare the contract
contract NHLMarket is ReentracncyGuard {
    using Counterss for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

     address payable owner; // create a variable to set the owner of the project
    uint256 listingPrice = 0.25 ether;

    constructor () {
        owner = payable(msg.sender);
    } //*This is basically saying the owner of this contract is the person who deployed it
    

}
