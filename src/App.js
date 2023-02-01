import React from 'react';
import './App.css';

class App extends React.Component {
  intervalId;

  constructor() {
    super();

    this.state = {
      seconds: 0,
      decySeconds: 0
    };

    this.startStoper = this.startStoper.bind(this);
    this.stopStoper = this.stopStoper.bind(this);
  }

  tick() {
    this.setState((state, props) => {
      let decySeconds = state.decySeconds + 1;
      let seconds = state.seconds;

      if(decySeconds === 10){
        seconds++;
        decySeconds = 0;
      }

      return {
        decySeconds: decySeconds,
        seconds: seconds
      };
    });
  }

  startStoper(){
    this.intervalId = setInterval(() => { this.tick() }, 100);
  }

  stopStoper(){
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div>
        <button onClick={this.startStoper}>Start</button>
        <button onClick={this.stopStoper}>Stop</button>
        <div>{this.state.seconds} : {this.state.decySeconds}</div>
      </div>
    );
  }
}

export default App;