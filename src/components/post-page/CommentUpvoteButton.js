import React from 'react';

import UpvotesIcon from '../../img/upvote-icon.png';

function CommentUpvoteButton({ numUpvotes, setNumUpvotes }) {
	async function handleUpvoteClick() {
		// Check if user already upvoted : if yes return

		// Check if user already downvoted : if yes then remove downvote user and decrement downvotes in database

		// Update the state to display new value locally
		setNumUpvotes(numUpvotes + 1);
		// Increment upvote counter in firebase

		// Add user to upvoteUsers in firebase
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
