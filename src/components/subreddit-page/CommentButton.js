import React from 'react';

import CommentsIcon from '../../img/comments-icon.png';

function CommentButton({ numComments }) {
	function handleDownvoteClick(e) {
		e.stopPropagation();
	}
	return (
		<button
			onClick={handleDownvoteClick}
			className='flex gap-2 items-end mr-4'
		>
			<div>
				<img src={CommentsIcon} />
			</div>
			<p className='text-xs font-semibold'>210</p>
		</button>
	);
}

export default CommentButton;
