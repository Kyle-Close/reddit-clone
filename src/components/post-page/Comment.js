import React from 'react';
import { useParams } from 'react-router';
import { commentService, userService } from '../../firebase';

import CommentImage from '../../img/comment-profile-picture.png';
import CommentInteractionBar from './CommentInteractionBar';

function Comment() {
	const [commentsList, setCommentsList] = React.useState(null);
	const { postId } = useParams();

	async function fetchCommentUserNames(commentsData) {
		console.log(commentsData[0]);
		if (!commentsData) return;
		const result = await Promise.all(
			commentsData.map(async (commentData) => {
				const userData = await userService.getUserById(commentData.userId);
				return { ...commentData, userName: userData.userName };
			})
		);
		return result;
	}

	React.useEffect(() => {
		const fetchComments = async () => {
			const commentsData = await commentService.getCommentsFromPostId(postId);
			if (commentsData.length === 0) return;
			const commentsList = await fetchCommentUserNames(commentsData);
			setCommentsList(commentsList);
		};
		fetchComments();
	}, []);

	function buildCommentElements() {
		if (!commentsList || commentsList.length < 1) return;
		return commentsList.map((commentData, key) => {
			return (
				<div
					key={key}
					className='flex gap-3'
				>
					<div className='w-10 flex-shrink-0'>
						<img
							src={CommentImage}
							alt='commentor profile icon'
						/>
					</div>
					<div className='overflow-auto grow flex flex-col'>
						<p className='text-xs'>{`u/${commentData.userName}`}</p>
						<p className='leading-tight'>{commentData.contents}</p>
						<CommentInteractionBar />
					</div>
				</div>
			);
		});
	}

	const commentElements = buildCommentElements();

	return (
		<div className='mx-6 my-5 text-sm flex flex-col gap-4'>
			{commentElements}
		</div>
	);
}

export default Comment;
