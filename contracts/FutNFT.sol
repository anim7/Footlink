// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FutNFT is ERC721, ERC721Enumerable, Ownable {
    /// @dev Should have logic for players with no suitable position array
    struct Player {
        string name;
        string preferredPosition;
        uint256 id;
        uint8 age;
        uint8 level;
        uint32 lastUpgrade;
        string[] suitablePositions;
        string imageURI;
    }

    struct History {
        uint256 winCount;
        uint256 lossCount;
    }
    mapping(address => History) ownerHistory;
    mapping(uint256 => Player) players;
    mapping(uint256 => address) public playerToOwner;
    mapping(uint256 => bool) public listedOnMarket;

    event PlayerAdded(uint256 playerId);

    modifier owned(uint256 id) {
        require(getPlayerExists(id), "Player does not exist");
        require(msg.sender == ownerOf(id), "Not the owner!");
        _;
    }

    constructor() ERC721("FutNFT", "FNFT") {}

    function getPlayer(uint256 _id) public view returns (Player memory) {
        return players[_id];
    }

    function ownerOf(uint256 tokenId)
        public
        view
        override(ERC721, IERC721)
        returns (address)
    {
        return super.ownerOf(tokenId);
    }

    function getPlayerExists(uint256 _id) public view returns (bool) {
        return playerToOwner[_id] != address(0);
    }

    function mint(Player memory _player) public onlyOwner {
        require(playerToOwner[_player.id] == address(0), "Player Exists!");
        players[_player.id] = _player;
        playerToOwner[_player.id] = msg.sender;
        _mint(msg.sender, _player.id);
        emit PlayerAdded(_player.id);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
