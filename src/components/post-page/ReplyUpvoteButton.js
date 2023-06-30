import React from 'react';
import { useSelector } from 'react-redux';
import { commentService } from '../../firebase';

import UpvoteIcon from '../../img/upvote-icon.png';

function ReplyUpvoteButton({
	numUpvotes,
	setNumUpvotes,
	setNumDownvotes,
	replyId,
	commentId,
}) {
	const [isDisabled, setIsDisabled] = React.useState(false);
	const authState = useSelector((state) => state.authState);

	async function handleClick() {
		setIsDisabled(true);
		if (!authState || !authState.userId) {
			setIsDisabled(false);
			return;
		}
		// Check if user already upvoted
		if (
			await commentService.hasUserUpvotedReply(
				authState.userId,
				commentId,
				replyId
			)
		) {
			setIsDisabled(false);
			return;
		}
		// Check if user already downvoted
		if (
			await commentService.hasUserDownvotedReply(
				authState.userId,
				commentId,
				replyId
			)
		) {
			// Remove downvoteUser
			await commentService.removeReplyDownvoteUser(
				authState.userId,
				commentId,
				replyId
			);
			// Decrement downvotes in firebase
			await commentService.decrementReplyDownvote(commentId, replyId);
			// Decrement downvote counter to display new value locally
			setNumDownvotes((prev) => prev - 1);
		}
		// Update the state to display new value locally
		setNumUpvotes(numUpvotes + 1);
		// Increment upvote counter in firebase
		await commentService.incrementReplyUpvote(commentId, replyId);
		// Add user to upvoteUsers in firebase
		await commentService.addUserToReplyUpvoteUsers(
			authState.userId,
			commentId,
			replyId
		);
		setIsDisabled(false);
	}

	return (
		<button
			disabled={isDisabled}
			onClick={handleClick}
			className='flex items-end text-xs text-green-500 font-semibold'
		>
			<img
				src={UpvoteIcon}
				alt='Upvote icon'
			/>
			<p>{numUpvotes}</p>
		</button>
	);
}

export default ReplyUpvoteButton;
