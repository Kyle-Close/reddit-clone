import React from 'react';

import SearchIcon from '../../img/Search-Icon.png';

function SearchSubreddits({ updateSearchText }) {
	return (
		<div className='flex justify-center gap-3 px-6 pb-3 border-b-2 border-gray-500'>
			<div className='flex justify-center items-center aspect-auto h-full'>
				<img
					className='mt-1'
					src={SearchIcon}
				/>
			</div>
			<input
				onChange={(e) => updateSearchText(e.target.value)}
				placeholder='r/AskReddit'
				className='
        mt-1 block w-full rounded-md bg-gray-500 text-white
        border-transparent focus:ring-0 px-4 py-1
        '
			/>
		</div>
	);
}

export default SearchSubreddits;
