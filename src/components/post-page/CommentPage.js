import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { uuidv4 } from '@firebase/util';
import { postService, commentService } from '../../firebase';

import Header from '../header/Header';
import BackButton from '../header/BackButton';
import PostButton from '../header/PostButton';

function CommentPage() {
	const [comment, setComment] = React.useState(null);
	const [postData, setPostData] = React.useState(null);
	const { postId, subredditName } = useParams();
	const authState = useSelector((state) => state.authState);
	const navigate = useNavigate();

	React.useEffect(() => {
		const fetchPostData = async () => {
			// api call here
			let data;
			if (postId) {
				data = await postService.getPostDataFromPostId(postId);
			}
			setPostData(data);
		};
		fetchPostData();
	}, []);

	React.useEffect(() => {
		console.log(postData);
	}, [postData]);

	function handleChange(e) {
		setComment(e.target.value);
	}

	function isSubmitValid() {
		if (
			!comment ||
			comment === '' ||
			!postData ||
			(!authState && authState.userId)
		)
			return false;
		else return true;
	}

	async function handleSubmit() {
		if (!isSubmitValid) return;

		const commentId = uuidv4();
		// Create comment by adding to database
		await commentService.createComment(
			commentId,
			postData.postId,
			comment,
			authState.userId
		);
		// Navigate user back to post page
		navigate(`/r/${subredditName}/${postData.postId}`);
	}

	return (
		postData && (
			<div className='h-screen bg-black text-gray-100 flex flex-col'>
				<Header gap='gap-12'>
					<BackButton />
					<h3 className='font-semibold'>Add Comment</h3>
					<div className='grow h-2/3 flex justify-end items-center mr-6 text-sm'>
						<PostButton handleSubmit={handleSubmit} />
					</div>
				</Header>
				<div className='m-4 flex flex-col flex-grow'>
					<h3 className='text-sm border-b pb-2 border-gray-50/50'>
						{postData.title}
					</h3>
					<textarea
						onChange={handleChange}
						maxLength={10000}
						className='bg-zinc-600 h-full rounded-md py-3 px-3 text-white placeholder-gray-400 resize-none mt-3'
						placeholder='Comment here'
						required
					/>
				</div>
			</div>
		)
	);
}

export default CommentPage;
