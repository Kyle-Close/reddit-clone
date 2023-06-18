import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';

import { useSelector, useDispatch } from 'react-redux';
import { setUserId } from './reducers/authState';
import { auth } from './firebase';
import { monitorAuthState, createNewUser, signInUser, logout } from './auth';

import ProfileModal from './components/ProfileModal';

function App() {
	const authState = useSelector((state) => state.authState);
	const dispatch = useDispatch();

	React.useEffect(() => {
		// Set user ID in state. Use this for grabbing data later
		const callback = (user) => {
			if (user) dispatch(setUserId(user.uid));
			else dispatch(setUserId(null));
		};
		// Initialize authentication state monitoring
		monitorAuthState(auth, callback);
	}, []);

	React.useEffect(() => {
		let id;
		if (authState && authState.userId) id = authState.userId;
		id ? console.log(id) : console.log('No user currently signed in.');
	}, [authState]);

	return (
		<div>
			<Header />
			{/* <ProfileModal direction='right' /> */}
			<button
				className='px-4 py-2 bg-teal-500 rounded w-1/6'
				onClick={() => {
					signInUser(auth, 'close1@gmail.com', 'Hello1234');
				}}
			>
				Sign in
			</button>

			<button
				className='ml-4 px-4 py-2 bg-red-500 rounded w-1/6'
				onClick={() => {
					//createNewUser(auth, 'close1@gmail.com', 'Hello1234');
					logout(auth);
				}}
			>
				Create New User
			</button>
			<button
				className='ml-4 px-4 py-2 bg-red-500 rounded w-1/6'
				onClick={() => {
					logout(auth);
				}}
			>
				Logout
			</button>
			{authState && (
				<div>{`Currently signed in as ID: ${authState.userId}`}</div>
			)}
		</div>
	);
}

export default App;
