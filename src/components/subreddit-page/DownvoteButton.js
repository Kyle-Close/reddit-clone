import React from 'react';
import { useSelector } from 'react-redux';

import DownvotesIcon from '../../img/downvote-icon.png';
import {postService} from '../../firebase';

function DownvoteButton({ numDownvotes, postId, setUpvotes, setDownvotes }) {
	const authState = useSelector((state) => state.authState);
	const [isDisabled, setIsDisabled] = React.useState(false)

	async function handleDownvoteClick(e) {
		setIsDisabled(true)
		e.stopPropagation();
		if (!authState || authState.userId === null) {
			setIsDisabled(false)
			return
		};
		const downvoteResult = await postService.downvotePost(postId, authState.userId);
		if (downvoteResult) {
			// increment downvote state
			setDownvotes((prev) => prev + 1);
			if (downvoteResult === -1) {
				// decrement upvote state
				setUpvotes((prev) => prev - 1);
			}
		}
		setIsDisabled(false)
	}

	return (
		<button
		disabled={isDisabled}
			onClick={handleDownvoteClick}
			className='flex items-end'
		>
			<img src={DownvotesIcon} alt='downvote icon'/>
			<p className='text-xs text-red-500 font-semibold'>{numDownvotes}</p>
		</button>
	);
}

export default DownvoteButton;
