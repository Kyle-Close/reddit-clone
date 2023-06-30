import React from 'react';
import { useSelector } from 'react-redux';
import { commentService } from '../../firebase';

import DownvoteIcon from '../../img/downvote-icon.png';

function ReplyDownvoteButton({
	numDownvotes,
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
		// Check if user already downvoted reply
		if (
			await commentService.hasUserDownvotedReply(
				authState.userId,
				commentId,
				replyId
			)
		) {
			setIsDisabled(false);
			return;
		}
		// Check if user already upvoted reply
		if (
			await commentService.hasUserUpvotedReply(
				authState.userId,
				commentId,
				replyId
			)
		) {
			// Remove upvoteUser from list
			await commentService.removeReplyUpvoteUser(
				authState.userId,
				commentId,
				replyId
			);
			// Decrement upvotes on reply
			await commentService.decrementReplyUpvote(commentId, replyId);
			// Decrement upvote counter (state)
			setNumUpvotes((prev) => prev - 1);
		}
		// Increment downvote counter (state)
		setNumDownvotes((prev) => prev + 1);
		// Increment downvotes in firebase
		await commentService.incrementReplyDownvote(commentId, replyId);
		// Add user to downvoteUsers in firebase
		await commentService.addUserToReplyDownvoteUsers(
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
			className='flex items-end text-xs text-red-500 font-semibold'
		>
			<img
				src={DownvoteIcon}
				alt='Downvote icon'
			/>
			<p>{numDownvotes}</p>
		</button>
	);
}

export default ReplyDownvoteButton;
