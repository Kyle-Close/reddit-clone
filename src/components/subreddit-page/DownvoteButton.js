import React from 'react';
import { useSelector } from 'react-redux';

import DownvotesIcon from '../../img/downvote-icon.png';
import { downvotePost } from '../../firebase';

function DownvoteButton({ numDownvotes, postId }) {
	const authState = useSelector((state) => state.authState);

	async function handleDownvoteClick(e) {
		e.stopPropagation();
		if(!authState) return
		if(await downvotePost(postId, authState.userId)){
			console.log("Success! Post downvoted")
		}else{
			console.log("Error. Could not downvote post")
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
