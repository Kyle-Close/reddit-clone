import React from 'react';
import { useSelector } from 'react-redux';

import DownvotesIcon from '../../img/downvote-icon.png';
import { downvotePost } from '../../firebase';

function DownvoteButton({ numDownvotes, postId }) {
	const authState = useSelector((state) => state.authState);
	const [downvotes, setDownvotes] = React.useState(numDownvotes)

	async function handleDownvoteClick(e) {
		e.stopPropagation();
		if(!authState) return
		if(await downvotePost(postId, authState.userId)){
			setDownvotes(prevDownvotes => prevDownvotes + 1)
		}
	}

	return (
		<button
			onClick={handleDownvoteClick}
			className='flex items-end'
		>
			<img src={DownvotesIcon} />
			<p className='text-xs text-red-500 font-semibold'>{downvotes}</p>
		</button>
	);
}

export default DownvoteButton;
