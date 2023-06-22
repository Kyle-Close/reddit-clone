import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import Header from '../header/Header';
import MenuSelectButton from '../header/MenuSelectButton';
import ProfileIcon from '../header/ProfileIcon';
import ProfileModal from '../profile-modal/ProfileModal';
import MenuModal from '../menu-modal/MenuModal';
import CreatePostIcon from '../header/CreatePostIcon';

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
		<div>
			<Header
				justify={'justify-between'}
				gap={'gap-8'}
			>
				<div className='flex gap-12'>
					<MenuSelectButton />
					<div className='flex flex-col text-gray-200 gap-1'>
						<h6 className='text-xs'>{`/r/${subredditName.toLowerCase()}`}</h6>
						<button
							className='border-gray-200 border px-2.5 py-0.5 rounded-full
            text-xs'
						>
							Subscribe
						</button>
					</div>
				</div>
				<div className='flex gap-8'>
					<CreatePostIcon />
					<ProfileIcon />
				</div>
			</Header>
			{modal.isOpen && renderModal()}
		</div>
	);
}

export default Subreddit;
