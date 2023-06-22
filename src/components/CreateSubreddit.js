import React from 'react';
import Header from './header/Header';
import BackButton from './header/BackButton';

function CreateSubreddit() {
	return (
		<>
			<Header gap='gap-12'>
				<BackButton />
				<h3 className='text-gray-200 font-semibold text-lg'>
					Create a Subreddit
				</h3>
			</Header>
		</>
	);
}

export default CreateSubreddit;
