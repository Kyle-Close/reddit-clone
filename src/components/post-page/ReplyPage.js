import React from 'react';
import { useSelector } from 'react-redux';
import { commentService } from '../../firebase';
import { useParams, useNavigate } from 'react-router';
import { uuidv4 } from '@firebase/util';

import Header from '../header/Header';
import BackButton from '../header/BackButton';
import PostButton from '../header/PostButton';

function ReplyPage() {
	const [replyText, setReplyText] = React.useState(null);
	const [originalComment, setOriginalComment] = React.useState(null);
	const authState = useSelector((state) => state.authState);
	const { commentId } = useParams();
	const navigate = useNavigate();

	React.useEffect(() => {
		const fetchCommentData = async () => {
			const commentData = await commentService.getCommentFromCommentId(
				commentId
			);
			if (commentData) setOriginalComment(commentData.contents);
		};
		if (commentId) fetchCommentData();
	}, []);

	async function handleChange(e) {
		setReplyText(e.target.value);
	}

	async function handleSubmit() {
		if (!isSubmitValid()) return;
		const replyData = createReplyObject();
		await commentService.addReplyToComment(commentId, replyData);
		navigate(-1);
	}

	function isSubmitValid() {
		if (
			!replyText ||
			replyText.length < 1 ||
			!authState ||
			!authState.userId ||
			!commentId
		)
			return false;
		else return true;
	}

	function createReplyObject() {
		return {
			replyId: uuidv4(),
			replyText: replyText,
			userId: authState.userId,
			timestamp: Date.now(),
			upvotes: [],
			upvoteUsers: [],
			downvotes: [],
			downvoteUsers: [],
		};
	}

	return (
		originalComment && (
			<div className='h-screen bg-black text-gray-100 flex flex-col'>
				<Header gap='gap-12'>
					<BackButton />
					<h3 className='font-semibold'>Add Reply</h3>
					<div className='grow h-2/3 flex justify-end items-center mr-6 text-sm'>
						<PostButton handleSubmit={handleSubmit} />
					</div>
				</Header>
				<div className='m-4 flex flex-col flex-grow'>
					<h3 className='text-sm border-b pb-2 border-gray-50/50'>
						{originalComment}
					</h3>
					<textarea
						onChange={handleChange}
						maxLength={10000}
						className='bg-zinc-600 h-full rounded-md py-3 px-3 text-white placeholder-gray-400 resize-none mt-3'
						placeholder='Reply here'
						required
					/>
				</div>
			</div>
		)
	);
}

export default ReplyPage;
