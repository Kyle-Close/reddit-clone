import React from 'react';

import Header from '../header/Header';
import MenuSelectButton from '../header/MenuSelectButton';

import CreatePostIcon from '../header/CreatePostIcon';
import ProfileIcon from '../header/ProfileIcon';

function SubredditPageHeader({ subredditName }) {
	return (
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
	);
}

export default SubredditPageHeader;
