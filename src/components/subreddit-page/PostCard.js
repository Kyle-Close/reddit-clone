import React from 'react';

import CommentsIcon from '../../img/comments-icon.png';
import UpvotesIcon from '../../img/upvote-icon.png';
import DownvotesIcon from '../../img/downvote-icon.png';

function PostCard() {
	return (
		<div className='bg-gray-700 flex flex-col mx-6 my-4 rounded-md text-gray-200 gap-4 p-4'>
			<h1 className='grow font-semibold'>
				My PS5 setup is unconventional to most gaming rooms I suppose, but I
				like it
			</h1>
			<div className='flex justify-between'>
				<div className='flex gap-6'>
					<button className='flex items-end'>
						<img src={UpvotesIcon} />
						<p className='text-xs text-green-500 font-semibold'>925</p>
					</button>
					<button className='flex items-end'>
						<img src={DownvotesIcon} />
						<p className='text-xs text-red-500 font-semibold'>40</p>
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
