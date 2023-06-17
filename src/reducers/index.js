import { configureStore, combineReducers } from '@reduxjs/toolkit';

import todos from './todos';
import counter from './counter';

const rootReducer = combineReducers({
	todos,
	counter,
});

export default configureStore({ reducer: rootReducer });
