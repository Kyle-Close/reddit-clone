import React from 'react';

import UpvotesIcon from '../../img/upvote-icon.png';

function CommentUpvoteButton() {
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
			<p className='text-xs text-green-500 font-semibold'>1</p>
		</button>
	);
}

export default CommentUpvoteButton;
