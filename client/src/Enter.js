import React, { Component } from 'react';
import './App.css';

class Enter extends Component {
    state = { enter: null };

    handleClick = () => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Lottery;

        // Let drizzle know we want to watch the 'Lottery' method
        const enter = contract.methods["enter"].cacheSend({value:'100000000000000000'});

        // Save the keya to local component state
        this.setState({ enter });
    }

    getTxStatus = () => {
        // Get the transaction states from the drizzle state
        const { transactions, transactionStack } = this.props.drizzleState;

        // Get the transaction hash using our saved id
        const txHash = transactionStack[this.state.enter];
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
                <h2>Want to try your odd?</h2>
                <p style={boardStyle}>
                    <button onClick={this.handleClick}>Buy one ticket</button>
                    <br />
                    {this.getTxStatus()}
                </p>
            </div>
        );
    }
}

export default Enter;

