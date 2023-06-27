import React from 'react';
import { useParams } from 'react-router';
import { commentService, userService } from '../../firebase';

import Reply from './Reply';
import CommentWithReplies from './CommentWithReplies';

function Comment() {
	const [commentsList, setCommentsList] = React.useState(null);
	const { postId } = useParams();

	async function fetchCommentUserNames(commentsData) {
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
			console.log(commentData)
			const replySection = commentData.replies.map((replyData, replyKey) => {
				return (
					<Reply
						key={replyKey}
						replyData={replyData}
						commentId={commentData.commentId}
					/>
				);
			});
			return (
				<CommentWithReplies
					key={key}
					commentData={commentData}
					replySection={replySection}
				/>
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
