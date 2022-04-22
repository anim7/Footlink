// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract Footlink is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    /// @dev Should have logic for players with no suitable position array
    struct Player {
        string name;
        string preferredPosition;
        string imageURI;
        string themeColor;
        string textColor;
        string[] suitablePositions;
        uint256 id;
        uint64 dob;
        uint64 lastUpgrade;
        uint16 level;
    }

    struct History {
        uint256 winCount;
        uint256 lossCount;
    }

    struct LineUp {
        uint256[11] playerIds;
        string[11] positions;
        string formation;
        bool isValid;
    }

    Counters.Counter internal _currId;
    mapping(address => History) internal ownerHistory;
    mapping(uint256 => Player) internal players;
    mapping(uint256 => address) public playerToOwner;
    mapping(uint256 => uint256) internal listedPlayerIndex;
    mapping(uint256 => uint256) public listedPlayersPrices;
    mapping(address => LineUp) public lineUps;
    mapping(address => uint256) internal ownerPlayerCount;
    uint256[] public listedPlayers;
    uint256[] internal playerIds;

    event PlayerAdded(uint256 playerId);

    modifier owned(uint256 id) {
        require(getPlayerExists(id), "Player does not exist");
        require(msg.sender == ownerOf(id), "Not the owner!");
        _;
    }

    constructor() ERC721("Footlink", "CLUB") {}

    function getListedPlayers() public view returns (uint256[] memory) {
        return listedPlayers;
    }

    function getPlayer(uint256 _id) public view returns (Player memory) {
        return players[_id];
    }

    function getPlayersByOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](ownerPlayerCount[_owner]);
        uint256 index = 0;
        for (uint256 i = 0; i < playerIds.length; i++) {
            if (
                playerToOwner[playerIds[i]] == _owner &&
                listedPlayerIndex[playerIds[i]] == 0
            ) {
                result[index] = playerIds[i];
                index++;
            }
        }
        return result;
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
        _currId.increment();
        _player.id = _currId.current();
        players[_player.id] = _player;
        playerIds.push(_player.id);
        playerToOwner[_player.id] = msg.sender;
        ownerPlayerCount[msg.sender]++;
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

    function getBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function withdraw(uint256 _price) public onlyOwner {
        require(
            address(this).balance >= _price,
            "The price is greater than balance!"
        );
        address to = payable(msg.sender);
        (bool sent, ) = to.call{value: _price}("");
        require(sent, "Transaction failed, could not send funds!");
    }
}
