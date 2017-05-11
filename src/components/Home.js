import React, { Component } from 'react';

class Home extends Component {
  constructor(props){
    super(props);
  }

  render(){
    var props = this.props,
      count = props.count,
      current = "",
      dropdown = "",
      dropdownItems = [],
      i;
    for ( i = 0; i < count.length; i++ ){
      if ( count[i].selected === true ){
        current = (
          <div>
            <h4>{count[i].label}: {count[i].count}</h4>
          </div>
        );
      } 
    }

    $.each( count, (index, item) => {
      console.log( index );
      console.log( item );
      dropdownItems.push( (
        <option key={index} selected={item.selected}>{item.label}</option>
      ) );
    } );

    dropdown = (
      <div>
        <select onChange={props.changeSelection}>
          {dropdownItems}
        </select>
      </div>
    );

    return (
      <div className="container-fluid">
        <h1>React Redux Boiler 1.5</h1>
        {current}
        {dropdown}
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
export default Home;
