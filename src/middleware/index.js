/**
 * ES6 quick functions
 * basically, this can be written as
 * handleSearchRequest = function(store){
 *   return function ( dispatcher ){
 *       return function ( action ){
 *          dispatcher( action );
 *       }
 *   }
 * }
 */
export const mainMiddleWare = (store) => (dispatcher) => (action) => {
  dispatcher(action);
  switch( action.type ){
    case 'INCREMENT_COUNT':
      // Stuff with INCREMENT_COUNT
      break;

    default:
      break;
  }
};
