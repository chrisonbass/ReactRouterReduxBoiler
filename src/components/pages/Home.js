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
        <h1>React Redux Boiler 2.1.1</h1>
        <div>
          <p>{this.state.label}: {this.state.count}</p>
        </div>
        <div>
          <select className="form-control" onChange={props.changeSelection} value={this.state.value}>
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
          <button className="btn btn-error" onClick={props.decrementCount} type="button"> 
            Decrement
          </button>
        </div>
        <h2>Grid System</h2>
        <p className="color-light-gray">col-xs-12 col-sm-6 col-md-4</p>
        <div className="row show-grid">
          <div className="col-xs-12 col-sm-6 col-md-4">
            <h3 className="color-darker-gray">Darker Gray</h3>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            <h3 className="color-gray">Gray</h3>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            <h3 className="color-light-gray">Light Gray</h3>
          </div>
          <div className="clearfix" />
        </div>
        <p className="color-light-gray">col-xs-12 col-sm-6 col-md-4</p>
        <div className="row show-grid">
          <div className="col-xs-12 col-sm-6 col-md-3">
            <h3 className="text-info">Info Color</h3>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3">
            <h3 className="text-primary">Primary Color</h3>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3">
            <h3 className="text-success">Success Color</h3>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3">
            <h3 className="text-error">Error Color</h3>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3">
            <h3 className="text-warning">Warning Color</h3>
          </div>
          <div className="clearfix" />
        </div>

        <p className="color-light-gray">Example with Offsets</p>

        <div className="row show-grid">
          <div className="col-xs-4">
            <h3 className="text-info">Block 1</h3>
            <p>Size 4 Offset 0</p>
          </div>

          <div className="col-xs-4 col-xs-offset-4">
            <h3 className="text-info">Block 2</h3>
            <p>Size 4 Offset 4</p>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

export default mapper(Home);
