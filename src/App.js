import React from 'react';
import { Link } from 'react-router-dom';


import { useSelector, useDispatch } from 'react-redux';
import { setUserId } from './reducers/authState';
import { auth } from './firebase';
import { monitorAuthState, createNewUser, signInUser, logout } from './auth';

function App() {
	const authState = useSelector(state => state.authState);
	const dispatch = useDispatch();

	function callback(user){
		if(user) dispatch(setUserId(user.uid))
		else dispatch(setUserId(null))
	}

	React.useEffect(() => {
		monitorAuthState(auth, callback)
	}, [])

	React.useEffect(() => {
		let id;
		if(authState && authState.userId) id = authState.userId;
		id ? console.log(id) : console.log('No user currently signed in.')
	},[authState])



	return (
		<div>
				<button
					className='px-4 py-2 bg-teal-500 rounded w-1/6'
					onClick={() => {
						signInUser(auth, "close@gmail.com", "Hello12345")
					}}
				>
					Sign in
				</button>


			<button
				className='ml-4 px-4 py-2 bg-red-500 rounded w-1/6'
				onClick={() => {
					createNewUser(auth, 'close1@gmail.com', "Hello1234")
				}}
			>
				Create New User
			</button>
			<button
				className='ml-4 px-4 py-2 bg-red-500 rounded w-1/6'
				onClick={() => {
					logout(auth)
				}}
			>
				Logout
			</button>
		</div>
	);
}

export default App;
