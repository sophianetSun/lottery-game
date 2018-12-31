import React, { Component } from 'react';
import './App.css';

class Timer extends Component {
    state = { timer: null };

    handleClick = () => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Lottery;
        // Let drizzle know we want to watch the 'Lottery' method
        const timer = contract.methods["setEndTime"].cacheSend(0);
        this.setState({ timer });
    }

    getTxStatus = () => {
        // Get the transaction states from the drizzle state
        const { transactions, transactionStack } = this.props.drizzleState;

        // Get the transaction hash using our saved id
        let id = this.state.timer;
        const txHash = transactionStack[id];
        if (!txHash) return null;

        return `Transaction status: ${transactions[txHash].status}`;
    }

    render() {
        var boardStyle = {
            border: '10px solid #FFFFFF',
            padding: '10px',
        };

        return (
            <div>
                <h2>available pickwinner now(Only Manager)</h2>
                <p style={boardStyle}>
                    <button onClick={this.handleClick}>set now</button>
                    <br />
                    {this.getTxStatus()}
                </p>
            </div>
        );
    }
}

export default Timer;