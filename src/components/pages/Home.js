import React, { Component } from 'react';
import mapper from '../../container';


const defaultState = {
  count: 0,
  label: "Music",
  value: null
};

class Home extends Component {
  constructor(props){
    super(props);
    this.state = this.handleProps(props);
  }

  componentDidMount(){
    this.handleProps(this.props);
  }

  componentWillUpdate(props){
    var state = this.handleProps(this.props);
    if ( this.state !== state ){
      this.setState(state);
    }
  }

  handleProps(props){
    var oldState = this.state || Object.assign({}, defaultState),
      newState = Object.assign({}, defaultState),
      state;
    if ( props.count ){
      props.count.forEach( (item,index) => {
        if ( item.selected === true ) {
          newState.value = item.label;
          newState.label = item.label;
          newState.count = item.count;
        }
      } );
    }
    var fields = [
        "count",
        "label",
        "value"
      ],
      isDifferent = false;

    fields.forEach( (f) => {
      if ( isDifferent === true ){
        return;
      }
      if ( newState[f] !== oldState[f] ){
        isDifferent = true;
      }
    } );
    if ( isDifferent ){
      state = newState;
    } else {
      state = oldState;
    }
    return state;
  }

  render(){
    var props = this.props;

    return (
      <div className="container-fluid">
        <h1>React Redux Boiler 2.0</h1>
        <div>
          <h4>{this.state.label}: {this.state.count}</h4>
        </div>
        <div>
          <select onChange={props.changeSelection} value={this.state.value}>
            { props.count.map( (item, index) => {
              return (
                <option key={index}>{item.label}</option>
              );
            } ) }
          </select>
        </div>
        <div style={{marginTop: "15px"}}>
          <button className="btn btn-primary" onClick={props.incrementCount} type="button"> 
            Increment
          </button>
          &nbsp;
          &nbsp;
          <button className="btn btn-danger" onClick={props.decrementCount} type="button"> 
            Decrement
          </button>
        </div>
      </div>
    );
  }
}

export default mapper(Home);
