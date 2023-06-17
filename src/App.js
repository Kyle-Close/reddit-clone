import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './reducers/counter';

function App() {
	const count = useSelector((state) => state.counter);
	const dispatch = useDispatch();

	return (
		<div>
			<h3>Count: {count}</h3>
			<button
				className='px-4 py-2 bg-teal-500 rounded w-1/6'
				onClick={() => {
					dispatch(increment());
				}}
			>
				Add 1
			</button>
			<button
				className='ml-4 px-4 py-2 bg-red-500 rounded w-1/6'
				onClick={() => {
					dispatch(decrement());
				}}
			>
				Subtract 1
			</button>
		</div>
	);
}

export default App;
