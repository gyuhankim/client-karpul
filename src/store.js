import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import carpoolsReducer from './reducers/carpools';
import authReducer from './reducers/auth';
import protectedDataReducer from './reducers/protected-data';
import usersReducer from './reducers/users';
import modalsReducer from './reducers/modals';
import mapboxReducer from './reducers/mapbox';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const store = createStore(
    combineReducers({
        carpools: carpoolsReducer,
        form: formReducer,
        auth: authReducer,
        protectedData: protectedDataReducer,
        users: usersReducer,
        modals: modalsReducer,
        mapbox: mapboxReducer
    }),
    applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;
