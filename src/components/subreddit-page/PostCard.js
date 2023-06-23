import React from 'react';
import { useNavigate } from 'react-router';

import UpvoteButton from './UpvoteButton';
import DownvoteButton from './DownvoteButton';
import CommentButton from './CommentButton';

function PostCard({
	postId,
	title,
	numUpvotes,
	numDownvotes,
	numComments,
	subredditName,
}) {
	const navigate = useNavigate();
	function handleCardClick(e) {
		console.log('Clicked');
		navigate(`/r/${subredditName}/${postId}`);
	}

	return (
		<div
			onClick={handleCardClick}
			className='bg-gray-700 flex flex-col mx-6 my-4 rounded-md text-gray-200 gap-4 p-4'
		>
			<h1 className='grow font-semibold'>{title}</h1>
			<div className='flex justify-between'>
				<div className='flex gap-6'>
					<UpvoteButton
						postId={postId}
						numUpvotes={numUpvotes}
					/>
					<DownvoteButton
						postId={postId}
						numDownvotes={numDownvotes}
					/>
				</div>
				<CommentButton numComments={numComments} />
			</div>
		</div>
	);
}

export default PostCard;
