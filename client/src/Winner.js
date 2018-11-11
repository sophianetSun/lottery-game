import React, { Component } from 'react';
import './App.css';

class Winner extends Component {
    state = { pick: null };

    handleClick = () => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Lottery;

        // Let drizzle know we want to watch the 'Lottery' method
        const pick = contract.methods["pickWinner"].cacheSend();

        // Save the keya to local component state
        this.setState({ pick });
    }

    getTxStatus = () => {
        // Get the transaction states from the drizzle state
        const { transactions, transactionStack } = this.props.drizzleState;

        // Get the transaction hash using our saved id
        const txHash = transactionStack[this.state.pick];
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
                <h2>Time to pick a winner (<i>Manager Only</i>)</h2>
                <p style={boardStyle}>
                    <button onClick={this.handleClick}>Pick a winner</button>
                    <br />
                    {this.getTxStatus()}
                </p>
            </div>
        );
    }
}

export default Winner;

