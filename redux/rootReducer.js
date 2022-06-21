import AsyncStorage from '@react-native-async-storage/async-storage';

export const INIT_DATA = 'INIT_DATA';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export const initData = item => ({
  type: INIT_DATA,
  payload: item,
});

export const addItem = item => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeItem = item => ({
  type: REMOVE_ITEM,
  payload: item,
});

const initialState = {
  itemList: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_DATA:
      return action.payload;
    case ADD_ITEM:
      var data = {...state};
      data.usedList.push(action.payload);
      return data;
    case REMOVE_ITEM:
      var data = {...state};
      data.usedList = data.usedList.filter(
        item => item.id !== action.payload.id,
      );
      return data;
    default:
      return state;
  }
};

export default rootReducer;
