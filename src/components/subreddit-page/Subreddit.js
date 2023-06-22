import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import ProfileModal from '../profile-modal/ProfileModal';
import MenuModal from '../menu-modal/MenuModal';
import SubredditPageHeader from './SubredditPageHeader';
import PostCard from './PostCard';
import { getAllPostsInSubreddit, getSubredditId } from '../../firebase';

function Subreddit() {
	const { subredditName } = useParams();
	const modal = useSelector((state) => state.modal);
	const [postCards, setPostCards] = React.useState(null);

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

	async function getPostList() {
		const subredditId = await getSubredditId(subredditName);
		const postList = await getAllPostsInSubreddit(subredditId);
		createPostCards(postList);
	}

	function createPostCards(postList) {
		const cards = postList.map((postData) => {
			return (
				<PostCard
					title={postData.title}
					numUpvotes={postData.upvotes}
					numDownvotes={postData.downvotes}
				/>
			);
		});
		setPostCards(cards);
	}

	React.useEffect(() => {
		getPostList();
	}, [subredditName]);

	return (
		<div className='bg-black h-screen'>
			<SubredditPageHeader subredditName={subredditName} />
			{postCards}
			{modal.isOpen && renderModal()}
		</div>
	);
}

export default Subreddit;
