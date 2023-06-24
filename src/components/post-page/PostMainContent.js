import React from 'react';
import { useParams } from 'react-router';
import { userService } from '../../firebase';

import Vote from '../subreddit-page/Vote';
import CommentButton from '../subreddit-page/CommentButton';

function PostMainContent({ postData }) {
	const [userName, setUserName] = React.useState(null);
	const { subredditName } = useParams();

	React.useEffect(() => {
		const fetchAndSetUserName = async () => {
			const { userName } = await userService.getUserById(postData.userId);
			setUserName(userName);
		};
		fetchAndSetUserName();
	}, []);

	return (
		<div className='text-gray-300 flex flex-col mx-4 my-8 bg-gray-600 rounded-md px-4 py-4'>
			<h3>{`/r/${subredditName}`}</h3>
			<p className='text-gray-400 font-semibold text-sm'>{`u/${userName}`}</p>
			<h1 className='font-semibold text-lg mt-4'>{postData.title}</h1>
			<p className='mt-2'>{postData.description}</p>
			<div className='flex gap-4 text-gray-100 mt-4'>
				<Vote
					postId={postData.postId}
					numUpvotes={postData.upvotes}
					numDownvotes={postData.downvotes}
				/>
				<div className='flex items-end justify-end grow'>
					<CommentButton
						postId={postData.postId}
						numComments={1221}
					/>
				</div>
			</div>
		</div>
	);
}

export default PostMainContent;
