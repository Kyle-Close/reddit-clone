import React from 'react';

import SearchSubreddits from './SearchSubreddits';
import MenuCard from './MenuCard';

import AddIcon from '../../img/Add-Icon.png';
import SubredditIcon from '../../img/subreddit-icon.svg';

function MenuLoggedIn() {
	// searchText will be used to do a lookup in firebase to see if subreddit exists
	const [searchText, setSearchText] = React.useState('');

	function updateSearchText(newString) {
		setSearchText(newString);
	}

	const subredditCards = () => {
		return (
			<MenuCard
				icon={SubredditIcon}
				title='r/AskReddit'
			/>
		);
	};

	return (
		<div className='flex flex-col w-full my-4 text-gray-200'>
			<SearchSubreddits updateSearchText={updateSearchText} />
			<MenuCard
				icon={AddIcon}
				title='Create a Subreddit'
			/>
			<h4 className='mx-4 font-semibold'>Your Subreddits</h4>
			{subredditCards()}
		</div>
	);
}

export default MenuLoggedIn;
