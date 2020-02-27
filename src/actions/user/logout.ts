import { LOGOUT } from 'redux/types/actions';

// Types
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const userLogout: ActionCreator<ThunkAction<
  void,
  AppState,
  any,
  Action
>> = () => dispatch => {
  delete localStorage.nyxToken;

  dispatch({
    type: LOGOUT
  });
};

export default userLogout;
