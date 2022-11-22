// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzepplin/contracts/token/ERC721/ERC721.sol";
import "@openzepplin/contracts/token/ERC721/extensions/ERC721Storage.sol";
import "@openzepplin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
   
    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds; 
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("NHL Marketplace", "NHL") {
        contractAddress = marketplaceAddress;
    }

}
