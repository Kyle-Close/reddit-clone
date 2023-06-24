import React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

import CommentsIcon from '../../img/comments-icon.png';

function CommentButton({ numComments, postId }) {
	const navigate = useNavigate();
	const { subredditName } = useParams();

	function handleDownvoteClick(e) {
		e.stopPropagation();
		navigate(`/r/${subredditName}/${postId}/comment`);
	}
	return (
		<button
			onClick={handleDownvoteClick}
			className='flex gap-2 items-end mr-4'
		>
			<div>
				<img src={CommentsIcon} />
			</div>
			<p className='text-xs font-semibold'>{numComments}</p>
		</button>
	);
}

export default CommentButton;
