import React from 'react';

import UpvotesIcon from '../../img/upvote-icon.png';

function UpvoteButton({ numUpvotes }) {
	function handleUpvoteClick(e) {
		e.stopPropagation();
		console.log('Clicked upvote');
	}
	return (
		<button
			onClick={handleUpvoteClick}
			className='flex items-end'
		>
			<img src={UpvotesIcon} />
			<p className='text-xs text-green-500 font-semibold'>{numUpvotes}</p>
		</button>
	);
}

export default UpvoteButton;
