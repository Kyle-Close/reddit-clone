import React from 'react';

import SearchSubreddits from './SearchSubreddits';
import MenuCard from './MenuCard';
import {subredditService} from '../../firebase';

import AddIcon from '../../img/Add-Icon.png';
import SubredditIcon from '../../img/subreddit-icon.svg';

function MenuLoggedIn() {
	// searchText will be used to do a lookup in firebase to see if subreddit exists
	const [searchText, setSearchText] = React.useState('');
	const [subredditCards, setSubredditCards] = React.useState([]);

	function updateSearchText(newString) {
		setSearchText(newString);
	}

	React.useEffect(() => {
		async function createSubredditCards() {
			const subredditNames = await subredditService.getSubredditNames();
			const cards = subredditNames.map((name, key) => {
				return (
					<MenuCard
						key={key}
						icon={SubredditIcon}
						name={name}
						link={`/r/${name}`}
					/>
				);
			});
			setSubredditCards(cards);
		}
		createSubredditCards();
	}, []);

	return (
		<div className='flex flex-col w-full my-4 text-gray-200'>
			<SearchSubreddits updateSearchText={updateSearchText} />
			<MenuCard
				icon={AddIcon}
				name='Create a Subreddit'
				link={'/create_subreddit'}
			/>
			<h4 className='mx-4 my-4 font-semibold'>Your Subreddits</h4>
			{subredditCards && subredditCards}
		</div>
	);
}

export default MenuLoggedIn;
