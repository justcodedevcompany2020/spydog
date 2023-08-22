const initialState = {
  mood: '#ECF3FB',
  menu: false,
};

const MainReducer = (state = initialState, action) => {
  let item = { ...state };
  switch (action.type) {
    case 'ChangeMoodToDark':
      item.mood = '#101B36';
      break;
    case 'ChangeMoodToLight':
      item.mood = '#ECF3FB';
      break;
    case 'OpenMenu':
      item.menu = action.open
      break
    default:
      break;
  }
  return item;
};
export default MainReducer;
