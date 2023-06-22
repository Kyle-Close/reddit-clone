import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { auth } from './firebase';

import './index.css';
import { Provider } from 'react-redux';
import store from './reducers';
import router from './routes';
import { setUserId } from './reducers/authState';
import { monitorAuthState } from './auth';
import { getAllPostsInSubreddit } from './firebase';

// Your initialization function
function initialize() {
	const callback = (user) => {
		if (user) store.dispatch(setUserId(user.uid));
		else store.dispatch(setUserId(null));
	};
	monitorAuthState(auth, callback)
  // Add your initialization code here
}

// Call your initialization function
getAllPostsInSubreddit("2")
initialize();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
