import React from 'react';
import { useSelector } from 'react-redux';

import UpvotesIcon from '../../img/upvote-icon.png';
import { commentService } from '../../firebase';

function CommentUpvoteButton({ numUpvotes, setNumUpvotes, setNumDownvotes, commentId }) {
	const authState = useSelector(state => state.authState)
	const [isDisabled, setIsDisabled] = React.useState(false)

	async function handleUpvoteClick() {
		setIsDisabled(true)
		if(!authState || !authState.userId) {
			setIsDisabled(false)
			return
		}
		// Check if user already upvoted
		if(await commentService.hasUserUpvotedComment(authState.userId, commentId))  {
			setIsDisabled(false)
			return
		}
		// Check if user already downvoted
		if(await commentService.hasUserDownvotedComment(authState.userId, commentId)){
			// Remove downvoteUser
			await commentService.removeDownvoteUser(authState.userId, commentId)
			// Decrement downvotes in firebase
			await commentService.decrementCommentDownvote(commentId)
			// Decrement downvote counter to display new value locally
			setNumDownvotes(prev => prev - 1)
		}
		// Update the state to display new value locally
		setNumUpvotes(numUpvotes + 1);
		// Increment upvote counter in firebase
		await commentService.incrementCommentUpvote(commentId)
		// Add user to upvoteUsers in firebase
		await commentService.addUserToUpvoteUsers(authState.userId, commentId)
		setIsDisabled(false)
	}

	return (
		<button
			disabled={isDisabled}
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
