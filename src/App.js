import React from 'react';
import { Link } from 'react-router-dom';


import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './reducers/counter';
import { auth } from './firebase';
import { monitorAuthState, createNewUser, signInUser, logout } from './auth';

function App() {
	const count = useSelector((state) => state.counter);
	const dispatch = useDispatch();

	function callback(user){
		console.log(count)
	}

	React.useEffect(() => {
		monitorAuthState(auth, callback)
	},[])



	return (
		<div>
			<h3>Count: {count}</h3>
				<button
					className='px-4 py-2 bg-teal-500 rounded w-1/6'
					onClick={() => {
						dispatch(increment());
						signInUser(auth, "close@gmail.com", "Hello1234")
					}}
				>
					Add 1
				</button>


			<button
				className='ml-4 px-4 py-2 bg-red-500 rounded w-1/6'
				onClick={() => {
					dispatch(decrement());
					createNewUser(auth, 'close@gmail.com', "Hello1234")
				}}
			>
				Subtract 1
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
