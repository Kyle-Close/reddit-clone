import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authState from './authState';
import modal from './modal';

const rootReducer = combineReducers({
	authState,
	modal,
});

export default configureStore({ reducer: rootReducer });
