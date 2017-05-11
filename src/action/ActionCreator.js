export const incrementCount = () => {
  return {
    type: 'INCREMENT_COUNT',
  };
};

export const decrementCount = () => {
  return {
    type: 'DECREMENT_COUNT',
  };
};

export const changeSelection = (e) => {
  return {
    type: 'CHANGE_SELECTION',
    index: e.target.selectedIndex
  };
};

