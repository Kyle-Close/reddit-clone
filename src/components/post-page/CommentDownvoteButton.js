import React from 'react';

import DownvotesIcon from '../../img/downvote-icon.png';

function CommentDownvoteButton() {
	async function handleDownvoteClick(e) {
		console.log('Comment Downvote Clicked');
	}

	return (
		<button
			onClick={handleDownvoteClick}
			className='flex items-end'
		>
			<img
				src={DownvotesIcon}
				alt='upvote icon'
			/>
			<p className='text-xs text-red-500 font-semibold'>2</p>
		</button>
	);
}

export default CommentDownvoteButton;
