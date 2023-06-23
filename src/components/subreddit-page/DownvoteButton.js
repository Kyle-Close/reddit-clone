import React from 'react';

import DownvotesIcon from '../../img/downvote-icon.png';
import { downvotePost } from '../../firebase';

function DownvoteButton({ numDownvotes, postId }) {
	async function handleDownvoteClick(e) {
		e.stopPropagation();
		downvotePost(postId);
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
