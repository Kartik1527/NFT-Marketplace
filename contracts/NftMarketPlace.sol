// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFTMarketplace {
    string public name = "NFT Marketplace";
    uint256 public totalSupply;

    // Define a structure to represent an NFT
    struct NFT {
        uint256 id;
        string uri;
        address owner;
        bool isListed;
        uint256 price;
    }

    mapping(uint256 => NFT) public nfts;

    event Minted(uint256 indexed id, address indexed owner, string uri);
    event Listed(uint256 indexed id, uint256 price);
    event Purchased(uint256 indexed id, address indexed buyer);

    // Mint a new NFT
    function mintNFT(string memory uri) public {
        totalSupply++;
        nfts[totalSupply] = NFT(totalSupply, uri, msg.sender, false, 0);
        emit Minted(totalSupply, msg.sender, uri);
    }

    // List an NFT for sale
    function listNFT(uint256 id, uint256 price) public {
        NFT storage nft = nfts[id];
        require(nft.owner == msg.sender, "You must own the NFT to list it.");
        nft.isListed = true;
        nft.price = price;
        emit Listed(id, price);
    }

    // Purchase an NFT
    function purchaseNFT(uint256 id) public payable {
        NFT storage nft = nfts[id];
        require(nft.isListed, "NFT is not listed for sale.");
        require(msg.value >= nft.price, "Not enough ether to buy the NFT.");

        address previousOwner = nft.owner;
        nft.owner = msg.sender;
        nft.isListed = false;
        nft.price = 0;

        payable(previousOwner).transfer(msg.value);
        emit Purchased(id, msg.sender);
    }

    // Get NFT details
    function getNFT(uint256 id) public view returns (uint256, string memory, address, bool, uint256) {
        NFT memory nft = nfts[id];
        return (nft.id, nft.uri, nft.owner, nft.isListed, nft.price);
    }
}
