import React from 'react';

import UpvotesIcon from '../../img/upvote-icon.png';

function CommentUpvoteButton({ numUpvotes }) {
	console.log('HERE', numUpvotes);
	async function handleUpvoteClick(e) {
		console.log('Comment Upvote Clicked');
	}

	return (
		<button
			onClick={handleUpvoteClick}
			className='flex items-end'
		>
			<img
				src={UpvotesIcon}
				alt='upvote icon'
			/>
			<p className='text-xs text-green-500 font-semibold'>{numUpvotes}</p>
		</button>
	);
}

export default CommentUpvoteButton;
