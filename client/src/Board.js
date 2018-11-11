import React, { Component } from 'react';
import './App.css';

class Board extends Component {
    state = { manager: null, players: [], winner: null, prize: 0 };

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Lottery;

        // Let drizzle know we want to watch the 'Lottery' method
        const manager = contract.methods["manager"].cacheCall();
        const players = contract.methods["getPlayers"].cacheCall();
        const winner = contract.methods["winner"].cacheCall();

        // save the keya to local component state
        this.setState({ manager, players, winner });
        console.log(drizzleState);
        console.log(drizzle);
        console.log(contract);
    }

    render() {
        var boardStyle = {
            border: '10px solid #FFFFFF',
            padding: '10px',
            backgroundColor: '#D3D3D3',
        };

        // get the contract state from drizzleState
        const { Lottery } = this.props.drizzleState.contracts;
        const { web3 } = this.props.drizzle;

        // using the saved key, get the variable
        const manager = Lottery.manager[this.state.manager];
        const players = Lottery.getPlayers[this.state.players];
        const winner = Lottery.winner[this.state.winner];

        web3.eth.getBalance(this.props.drizzle.contracts.Lottery.address)
        .then(a => { this.setState({prize: this.props.drizzle.web3.utils.fromWei(a, 'ether')})});

        return (
            <div>
                <h2>May the odds be ever in your favor!</h2>
                <p style={boardStyle}>
                    This contract is managed by {manager && manager.value}.
                    There are currently {players && players.value.length} people entered,
                    competing to win {this.state.prize} ethers!
                    <br />
                    <br />
                    {winner && winner.value} has won the last lottery.
                </p>
            </div>
        );
    }
}

export default Board;

