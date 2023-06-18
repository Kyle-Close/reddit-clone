import { configureStore, combineReducers } from '@reduxjs/toolkit';

import counter from './counter';
import authState from './authState';

const rootReducer = combineReducers({
	authState,
	counter,
});

export default configureStore({ reducer: rootReducer });
