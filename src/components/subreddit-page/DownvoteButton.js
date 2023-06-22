import React from 'react';

import DownvotesIcon from '../../img/downvote-icon.png';

function DownvoteButton({ numDownvotes }) {
	function handleDownvoteClick(e) {
		e.stopPropagation();
		console.log('Clicked downvote');
	}
	return (
		<button
			onClick={handleDownvoteClick}
			className='flex items-end'
		>
			<img src={DownvotesIcon} />
			<p className='text-xs text-red-500 font-semibold'>{numDownvotes}</p>
		</button>
	);
}

export default DownvoteButton;
