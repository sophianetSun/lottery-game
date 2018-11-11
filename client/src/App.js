import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import Enter from './Enter';
import Winner from './Winner';

class App extends Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grap the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it is ready and update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnMount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading)
      return "Loading Drizzle...";
    return (
      <div>
        <Board
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <Enter
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <Winner
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      </div>
    );
  }
}

export default App;
