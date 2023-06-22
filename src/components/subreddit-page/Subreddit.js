import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import ProfileModal from '../profile-modal/ProfileModal';
import MenuModal from '../menu-modal/MenuModal';
import SubredditPageHeader from './SubredditPageHeader';
import PostCard from './PostCard';

function Subreddit() {
	const { subredditName } = useParams();
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

	return (
		<div className='bg-black h-screen'>
			<SubredditPageHeader subredditName={subredditName} />
			<PostCard />
			{modal.isOpen && renderModal()}
		</div>
	);
}

export default Subreddit;
