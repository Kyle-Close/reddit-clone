import React from 'react';

import SearchSubreddits from './SearchSubreddits';

function MenuLoggedIn() {
	// searchText will be used to do a lookup in firebase to see if subreddit exists
	const [searchText, setSearchText] = React.useState('');

	function updateSearchText(newString) {
		setSearchText(newString);
	}

	return (
		<div className='flex flex-col w-full my-4'>
			<SearchSubreddits updateSearchText={updateSearchText} />
		</div>
	);
}

export default MenuLoggedIn;
