import React, { Component } from 'react';
import './App.css';

class Withdraw extends Component {
    state = { withdraw: null };

    handleClick = () => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Lottery;
        // Let drizzle know we want to watch the 'Lottery' method
        const withdraw = contract.methods["withdraw"].cacheSend();
        this.setState({ withdraw });
    }

    getTxStatus = () => {
        // Get the transaction states from the drizzle state
        const { transactions, transactionStack } = this.props.drizzleState;

        // Get the transaction hash using our saved id
        let id = this.state.withdraw;
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
                <h2>Withdraw reward(Only Winner)</h2>
                <p style={boardStyle}>
                    <button onClick={this.handleClick}>withdraw</button>
                    <br />
                    {this.getTxStatus()}
                </p>
            </div>
        );
    }
}

export default Withdraw;