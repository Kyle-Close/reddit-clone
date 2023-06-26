import React from 'react';
import { useNavigate } from 'react-router';

import CommentButton from './CommentButton';
import Vote from './Vote';
import { commentService } from '../../firebase';

function PostCard({ postId, title, numUpvotes, numDownvotes, subredditName }) {
	const [numComments, setNumComments] = React.useState(null);
	const navigate = useNavigate();

	function handleCardClick(e) {
		navigate(`/r/${subredditName}/${postId}`);
	}

	React.useEffect(() => {
		const fetchNumComments = async () => {
			const commentList = await commentService.getCommentsFromPostId(postId);
			setNumComments(commentList.length);
		};
		fetchNumComments();
	}, []);

	return (
		<div
			onClick={handleCardClick}
			className='bg-gray-700 flex flex-col mx-6 my-4 rounded-md text-gray-200 gap-4 p-4'
		>
			<h1 className='grow font-semibold'>{title}</h1>
			<div className='flex justify-between'>
				<div className='flex gap-6'>
					<Vote
						postId={postId}
						numUpvotes={numUpvotes}
						numDownvotes={numDownvotes}
					/>
				</div>
				<CommentButton
					postId={postId}
					numComments={numComments}
				/>
			</div>
		</div>
	);
}

export default PostCard;
