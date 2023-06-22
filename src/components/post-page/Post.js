import React from 'react';

import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import ProfileModal from '../profile-modal/ProfileModal';
import MenuModal from '../menu-modal/MenuModal';

import PostHeader from './PostHeader';
import UpvoteButton from '../subreddit-page/UpvoteButton';
import DownvoteButton from '../subreddit-page/DownvoteButton';

import { getPostDataFromPostId } from '../../firebase';

function Post() {
	const [postData, setPostData] = React.useState(null);

	const { postId } = useParams();
	const modal = useSelector((state) => state.modal);

	function renderModal() {
		switch (modal.type) {
			case 'profile':
				return <ProfileModal direction='right' />;
			case 'menu':
				return <MenuModal direction='left' />;
			default:
				return null;
		}
	}

	React.useEffect(() => {
		async function fetchPostData() {
			const dataVal = await getPostDataFromPostId(postId);
			setPostData(dataVal);
		}
		fetchPostData();
	}, []);

	React.useEffect(() => {
		console.log(postData);
	}, [postData]);

	return (
		<div className='h-screen bg-black'>
			<PostHeader />
			{postData && (
				<div className='text-gray-300 flex flex-col mx-4 my-8 bg-gray-600 rounded-md px-4 py-4'>
					<h3>{`/r/AskReddit`}</h3>
					<p className='text-gray-400 font-semibold text-sm'>{`u/close55`}</p>
					<h1 className='font-semibold text-lg mt-4'>{postData.title}</h1>
					<p className='mt-2'>{postData.description}</p>
					<div className='flex gap-4 text-gray-100 mt-4'>
						<UpvoteButton numUpvotes={postData.upvotes} />
						<DownvoteButton numDownvotes={postData.downvotes} />
					</div>
				</div>
			)}
			{modal.isOpen && renderModal()}
		</div>
	);
}

export default Post;
