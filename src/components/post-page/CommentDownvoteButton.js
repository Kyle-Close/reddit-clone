import React from 'react';
import { useSelector } from 'react-redux';
import { commentService } from '../../firebase';

import DownvotesIcon from '../../img/downvote-icon.png';

function CommentDownvoteButton({ numDownvotes, setNumUpvotes, setNumDownvotes, commentId}) {
	const authState = useSelector(state => state.authState)

	async function handleDownvoteClick() {
		if(!authState || !authState.userId) return
		// Check if user already downvoted
		if(await commentService.hasUserDownvotedComment(authState.userId, commentId)) return
		// Check if user already upvoted
		if(await commentService.hasUserUpvotedComment(authState.userId, commentId)){
			// Remove upvoteUser
			await commentService.removeUpvoteUser(authState.userId, commentId)
			// Decrement upvotes in firebase
			await commentService.decrementCommentUpvote(commentId)
			// Decrement upvote counter to display new value locally
			setNumUpvotes(prev => prev - 1)
		}
		// Update the state to display new value locally
		setNumDownvotes(numDownvotes + 1);
		// Increment downvote counter in firebase
		await commentService.incrementCommentDownvote(commentId)
		// Add user to downvoteUsers in firebase
		await commentService.addUserToDownvoteUsers(authState.userId, commentId)	}

	return (
		<button
			onClick={handleDownvoteClick}
			className='flex items-end'
		>
			<img
				src={DownvotesIcon}
				alt='upvote icon'
			/>
			<p className='text-xs text-red-500 font-semibold'>{numDownvotes}</p>
		</button>
	);
}

export default CommentDownvoteButton;
