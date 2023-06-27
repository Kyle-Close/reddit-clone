import React from 'react';
import { useSelector } from 'react-redux';

import UpvotesIcon from '../../img/upvote-icon.png';
import {postService} from '../../firebase';

function UpvoteButton({ numUpvotes, postId, setUpvotes, setDownvotes }) {
	const authState = useSelector((state) => state.authState);
	const [isDisabled, setIsDisabled] = React.useState(false)

	async function handleUpvoteClick(e) {
		setIsDisabled(true)
		e.stopPropagation();
		if (!authState || authState.userId === null ) {
			setIsDisabled(false)
			return
		};
		const upvoteResult = await postService.upvotePost(postId, authState.userId);
		if (upvoteResult) {
			// increment upvote state
			setUpvotes((prev) => prev + 1);
			if (upvoteResult === -1) {
				// decrement downvote state
				setDownvotes((prev) => prev - 1);
			}
		}
		setIsDisabled(false)
	}
	return (
		<button
			disabled={isDisabled}
			onClick={handleUpvoteClick}
			className='flex items-end'
		>
			<img src={UpvotesIcon} alt='upvote icon'/>
			<p className='text-xs text-green-500 font-semibold'>{numUpvotes}</p>
		</button>
	);
}

export default UpvoteButton;
