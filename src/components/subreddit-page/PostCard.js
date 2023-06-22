import React from 'react';
import { useNavigate } from 'react-router';

import CommentsIcon from '../../img/comments-icon.png';
import UpvotesIcon from '../../img/upvote-icon.png';
import DownvotesIcon from '../../img/downvote-icon.png';

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

	function handleUpvoteClick(e) {
		e.stopPropagation();
		console.log('Clicked upvote');
	}

	function handleDownvoteClick(e) {
		e.stopPropagation();
		console.log('Clicked downvote');
	}

	return (
		<div
			onClick={handleCardClick}
			className='bg-gray-700 flex flex-col mx-6 my-4 rounded-md text-gray-200 gap-4 p-4'
		>
			<h1 className='grow font-semibold'>{title}</h1>
			<div className='flex justify-between'>
				<div className='flex gap-6'>
					<button
						onClick={handleUpvoteClick}
						className='flex items-end'
					>
						<img src={UpvotesIcon} />
						<p className='text-xs text-green-500 font-semibold'>{numUpvotes}</p>
					</button>
					<button
						onClick={handleDownvoteClick}
						className='flex items-end'
					>
						<img src={DownvotesIcon} />
						<p className='text-xs text-red-500 font-semibold'>{numDownvotes}</p>
					</button>
				</div>
				<button className='flex gap-2 items-end mr-4'>
					<div>
						<img src={CommentsIcon} />
					</div>
					<p className='text-xs font-semibold'>210</p>
				</button>
			</div>
		</div>
	);
}

export default PostCard;
