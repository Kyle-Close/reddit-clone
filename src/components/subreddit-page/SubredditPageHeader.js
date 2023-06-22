import React from 'react';

import Header from '../header/Header';
import MenuSelectButton from '../header/MenuSelectButton';

import CreatePostIcon from '../header/CreatePostIcon';
import ProfileIcon from '../header/ProfileIcon';
import SubredditWithSubButton from '../header/SubredditWithSubButton';

function SubredditPageHeader({ subredditName }) {
	return (
		<Header
			justify={'justify-between'}
			gap={'gap-8'}
		>
			<div className='flex gap-12'>
				<MenuSelectButton />
				<SubredditWithSubButton subredditName={subredditName} />
			</div>
			<div className='flex gap-8'>
				<CreatePostIcon />
				<ProfileIcon />
			</div>
		</Header>
	);
}

export default SubredditPageHeader;
