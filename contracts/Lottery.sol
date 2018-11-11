pragma solidity ^"0.4.22";

contract Lottery {
    address public manager;
    address[] public players;
    address public winner;
    
    constructor() public {
        manager = msg.sender;
    }
    
    function enter() public payable returns(uint) {
        require(msg.value >= 0.1 ether);
        
        players.push(msg.sender);
    }
    
    function pickWinner() public returns (uint) {
        require(msg.sender == manager);
        
        winner = players[random() % players.length];
        winner.transfer(address(this).balance);
        players = new address[](0);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(
            abi.encodePacked(
                block.difficulty, block.timestamp, players)));
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}