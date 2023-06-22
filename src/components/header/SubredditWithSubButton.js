import React from 'react';

function SubredditWithSubButton({ subredditName }) {
	return (
		<div className='flex flex-col text-gray-200 gap-1'>
			<h6 className='text-xs'>{`/r/${subredditName.toLowerCase()}`}</h6>
			<button
				className='border-gray-200 border px-2.5 py-0.5 rounded-full
  text-xs'
			>
				Subscribe
			</button>
		</div>
	);
}

export default SubredditWithSubButton;
