pragma solidity ^0.4.22;

contract Lottery {
    address public manager;
    address[] public players;
    address public winner;
    uint public startTime;
    uint public endTime;

    mapping(address => uint) lotteryBalance;

    constructor() public {
        manager = msg.sender;
    }

    function enter() public payable returns(uint) {
        require(msg.value >= 0.1 ether);
        if (players.length == 0) {
            startTime = now;
            endTime = startTime + 60*10;
        }
        players.push(msg.sender);
        lotteryBalance[msg.sender] += 0.1 ether;
    }

    function pickWinner() public returns (uint) {
        require(msg.sender == manager);
        require(now >= endTime);
        rewardWinner();

    }

    function random() private view returns (uint) {
        return uint(keccak256(
            abi.encodePacked(
                block.difficulty, block.timestamp, players)));
    }

    function rewardWinner() internal {
        winner = players[random() % players.length];
        uint sum = 0;
        for (uint8 i=0; i<players.length; ++i) {
            address user = players[i];
            uint bal = lotteryBalance[user];
            sum += bal;
            lotteryBalance[user] -= bal;
        }
        lotteryBalance[winner] += sum;
        players = new address[](0);
    }

    function withdraw() public {
        require(msg.sender == winner);
        uint userBal = lotteryBalance[msg.sender];
        require(userBal > 0);
        require(address(this).balance >= userBal);

        msg.sender.transfer(userBal);
        lotteryBalance[msg.sender] -= userBal;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

    function setEndTime(uint duration) public returns (uint) {
        require(msg.sender == manager);
        endTime = startTime + duration;
        return endTime;
    }

    function destroy() public {
        require(msg.sender == manager);
        selfdestruct(msg.sender);
    }
}