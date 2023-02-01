import React from 'react';
import './App.css';

class App extends React.Component {
  intervalId;

  constructor() {
    super();

    this.state = {
      seconds: 0,
      decySeconds: 0,
      isActive: false,
      rounds: []
    };

    this.startStoper = this.startStoper.bind(this);
    this.stopStoper = this.stopStoper.bind(this);
    this.resetStoper = this.resetStoper.bind(this);
    this.addRound = this.addRound.bind(this);
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
    if(!this.isActive){
    this.intervalId = setInterval(() => { this.tick() }, 100);
    this.setState((state, props)=>{
      return{
        ...state,
        isActive: true
      }
    });
  }
}

  stopStoper(){
    clearInterval(this.intervalId);
    this.setState((state, props)=>{
      return{
        ...state,
        isActive: false
      }
    });
  }

  resetStoper(){
    this.setState(()=>{
      return{
        seconds: 0,
        decySeconds: 0,
        isActive: false,
        rounds: []
      }
    });
  }

  addRound(){
    this.setState((state)=>{
      return{
        ...state,
        rounds: [
          ...state.rounds,
          {
            decySeconds: state.decySeconds,
            seconds: state.seconds
          }
        ]
      }
    });
  }

  render() {
    const listItem = this.state.rounds.map((round, idx) => {
      return <li key={idx}>{round.seconds} : {round.decySeconds}</li>
    });
    return (
      <div>
        {!this.state.isActive && <button onClick={this.startStoper}>Start</button>}
        {this.state.isActive && <button onClick={this.stopStoper}>Stop</button>}
        {!this.state.isActive && <button onClick={this.resetStoper}>Reset</button>}
        {this.state.isActive && <button onClick={this.addRound}>Round</button>}
        <div>{this.state.seconds} : {this.state.decySeconds}</div>
        <h1>Rounds</h1>
        <ul>
          {listItem}
        </ul>
      </div>
    );
  }
}

export default App;