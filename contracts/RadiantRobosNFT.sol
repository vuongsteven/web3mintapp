//SLDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

/**
 * Radiant Robos NFT Contract - ERC721 
 * By: nobers labs
 *
 */

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; //consists of functions only the Owner can use

contract RadiantRobosNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public maxSupply; //max number of NFTs in the collection
    uint256 public totalSupply; //current number of NFTs minted
    uint256 public maxPerWallet;
    bool public isMintEnabled;
    string internal baseTokenUri; //Opensea can use this to determine where the images are located
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('RadiantRobos', 'RR') {
        mintPrice = 0.05 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 2;
        //withdrawWallet = ; set this later
    }

    function setIsMintEnabled(bool isMintEnabled_) external onlyOwner {
        isMintEnabled = isMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_; //URL where token image is located
    }

    function tokenURI(uint256 tokenId_) public view override returns(string memory){
        require(_exists(tokenId_), 'tokenId does not exist');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json")); //taken URL that we identified, grabbing ID, attaching json to the end of it
    } //function opensea calls to grab the images

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }(''); //withdraw contract balance to withdraw wallet
        require(success, 'Withdraw failed');
    }

    function mintRadiantRobos(uint256 quantity_) public payable {
        require(isMintEnabled, 'minting is not enabled');
        require(msg.value == quantity_ * mintPrice, 'mint value is not correct');
        require(totalSupply + quantity_ <= maxSupply, 'sold out!');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'you cannot mint more than 2 Robos!');

        for(uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId); //receiver's address and the NFT being given
        }
    }
}


