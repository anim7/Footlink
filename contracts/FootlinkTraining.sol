// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./Footlink.sol";

contract FootlinkTraining is Footlink {
    uint256 public cooldown = 43200 seconds;
    uint256 public fee = 3 ether;
    uint256 public earnedThroughTraining = 0;
    uint256 public maxLevel = 100;

    event LevelUp(uint256 playerId);

    modifier belowLevel(uint256 _level, uint256 _playerId) {
        require(
            players[_playerId].level < _level,
            "Player has reached max level!"
        );
        _;
    }

    modifier cooldownOver(uint256 _playerId, uint256 _cooldown) {
        require(
            players[_playerId].lastUpgrade + cooldown <= block.timestamp,
            "Cooldown period is not over!"
        );
        _;
    }

    function setCooldown(uint256 _cooldown) public onlyOwner {
        cooldown = _cooldown;
    }

    function setFee(uint256 _fee) public onlyOwner {
        fee = _fee;
    }

    function setMaxLevel(uint256 _level) public onlyOwner {
        maxLevel = _level;
    }

    function train(uint256 _playerId)
        public
        payable
        cooldownOver(_playerId, cooldown)
        belowLevel(maxLevel, _playerId)
        owned(_playerId)
    {
        require(msg.value >= fee, "Required fee is not sent!");
        players[_playerId].level++;
        players[_playerId].lastUpgrade = uint64(block.timestamp);
        earnedThroughTraining += msg.value;
        emit LevelUp(_playerId);
    }
}
