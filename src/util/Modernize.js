import shim from 'es5-shim';
import assign from 'object-assign';

const Modernize = () => {
  if ( Object.assign === undefined ){
    Object.assign = assign;
  }
  return {
    "assign" : Object.assign
  };
};

export default Modernize();
