import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import OnboardingReducer from './OnboardingReducer';
import UseronboardingReducer from './UseronboardingReducer'
const appReducer = combineReducers({
  LoginReducer,
  OnboardingReducer,
  UseronboardingReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
// API CALL