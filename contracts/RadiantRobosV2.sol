//SLDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RadiantRobosNFT is ERC721A, Ownable {
    uint256 public mintPrice;
    uint256 public maxSupply; 
    uint256 public totalSupply; 
    uint256 public maxPerWallet;
    bool public isMintEnabled;
    string internal baseTokenUri; 
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() ERC721A("RadiantRobos", "RR") {
        mintPrice = 0.05 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 2;
        withdrawWallet="";
    }

     function setIsMintEnabled(bool isMintEnabled_) external onlyOwner {
        isMintEnabled = isMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_; //URL where token image is located
    }

    function numberMinted(address owner) public view returns (uint256) {
      return _numberMinted(owner);
    }

    function tokenURI(uint256 tokenId_) public view override returns(string memory){
        require(_exists(tokenId_), 'tokenId does not exist');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json")); //taken URL that we identified, grabbing ID, attaching json to the end of it
    } //function opensea calls to grab the images

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }(''); //withdraw contract balance to withdraw wallet
        require(success, 'Withdraw failed');
    }

    function mint(uint256 quantity_) external payable {
        require(isMintEnabled, 'minting is not enabled');
        require(msg.value == quantity_ * mintPrice, 'mint value is not correct');
        require(totalSupply + quantity_ <= maxSupply, 'sold out!');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'you cannot mint more than 2 Robos!');

        _mint(msg.sender, quantity_);
        walletMints[msg.sender] += quantity_;
    }
}