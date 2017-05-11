import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action Creators
import React from 'react';
import * as actionCreators from './action/ActionCreator';

function mapStateToProps(state){
  return Object.assign({},state);
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    actionCreators, 
    dispatch
  );
}

var mapper = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component);
};

export default mapper;
