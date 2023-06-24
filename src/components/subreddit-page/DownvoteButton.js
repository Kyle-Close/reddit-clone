import React from 'react';
import { useSelector } from 'react-redux';

import DownvotesIcon from '../../img/downvote-icon.png';
import {postService} from '../../firebase';

function DownvoteButton({ numDownvotes, postId, setUpvotes, setDownvotes }) {
	const authState = useSelector((state) => state.authState);

	async function handleDownvoteClick(e) {
		e.stopPropagation();
		if (!authState) return;
		const downvoteResult = await postService.downvotePost(postId, authState.userId);
		if (downvoteResult) {
			// increment downvote state
			setDownvotes((prev) => prev + 1);
			if (downvoteResult === -1) {
				// decrement upvote state
				setUpvotes((prev) => prev - 1);
			}
		}
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
