/**
 * Reducer function names should match
 * the index name of the item they're 
 * manipulating.  
 */
export const count = (state = [], action) => {
  switch ( action.type ){
    case 'INCREMENT_COUNT':
    case 'DECREMENT_COUNT':
      return state.slice().map( (item, index) => {
        if ( item.selected === true ){
          if ( action.type === 'INCREMENT_COUNT' ){
            item.count++;
          } else {
            item.count--;
            if ( item.count < 0 ){
              item.count = 0;
            }
          }
        }
        return item;
      } );

    case 'CHANGE_SELECTION':
      return state.slice().map((item, index) => {
        item.selected = ( index === action.index );
        return item;
      } );

    default:
      return state;
  };
};

