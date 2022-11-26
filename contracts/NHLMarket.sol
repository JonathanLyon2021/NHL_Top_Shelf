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
    
 struct MarketItem {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller; // address for the seller
        address payable owner; // address for the owner
        uint256 price;  // price
        bool sold; // wether its sold or not
    }
      
    function getListingPrice() public view returns(uint256) {
    return listingPrice;
    }

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei"); //we dont want items listed for free
        require(msg.value = listingPrice, "Price must be equal to listing price");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

//create the market item, set the market value
    idToMarketItem[itemId] = MarketItem(
        itemId,
        nftContract,
        tokenId,
        payable(msg.sender),
        payable(address(0)),
        price,
        false
    );

    mapping(uint256 => MarkettItem) private idToMarketItem;
    //keeping up with the items that have beeen created

   //IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
}
