import React from 'react';

import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { postService } from '../../firebase';

import ProfileModal from '../profile-modal/ProfileModal';
import MenuModal from '../menu-modal/MenuModal';
import PostHeader from './PostHeader';
import PostMainContent from './PostMainContent';
import Comment from './Comment';

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
			const dataVal = await postService.getPostDataFromPostId(postId);
			setPostData(dataVal);
		}
		fetchPostData();
	}, []);

	return (
		<div className='h-screen bg-black text-gray-300 flex flex-col max-h-screen overflow-y-auto'>
			<PostHeader />
			{postData && (
				<div className='flex flex-col m-2'>
					<PostMainContent postData={postData} />
					<Comment />
				</div>
			)}
			{modal.isOpen && renderModal()}
		</div>
	);
}

export default Post;
