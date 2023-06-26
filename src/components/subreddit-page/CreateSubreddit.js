import React from 'react';
import Header from '../header/Header';
import BackButton from '../header/BackButton';

import { subredditService } from '../../firebase';
import { useNavigate } from 'react-router';

function CreateSubreddit() {
	const [subredditName, setSubredditName] = React.useState(null);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		// Check if subreddit name is taken already
		async function checkIfSubredditExists() {
			const names = await subredditService.getSubredditNames();
			let exists = false;
			names.forEach((name) => {
				if (name.toUpperCase() === subredditName.toUpperCase()) exists = true;
			});
			return exists;
		}

		// If not taken, create subreddit by adding it to database
		checkIfSubredditExists().then((exists) => {
			if (!exists) {
				subredditService.addNewSubreddit(subredditName);
			}
		});

		// Navigate user to their newly created subreddit
		navigate(`/r/${subredditName}`);
	}

	function handleFormChange(e) {
		setSubredditName(e.target.value);
	}

	function handleUserNameInputKeyDown(e) {
		const pattern = /[A-Za-z]/gi;
		const isMatch = e.key.match(pattern);
		if (!isMatch) e.preventDefault();
	}

	return (
		<div className='flex flex-col h-screen bg-black'>
			<Header justify='justify-between'>
				<BackButton destination={-1} />
			</Header>
			<div className='bg-zinc-700 grow mx-4 my-6 rounded-md text-gray-200'>
				<form
					onSubmit={handleSubmit}
					className='grid gap-4 m-8'
				>
					<div className='grid gap-2'>
						<label>Subreddit</label>
						<input
							maxLength={12}
							onKeyDown={handleUserNameInputKeyDown}
							onChange={handleFormChange}
							className='bg-zinc-400 h-12 rounded-md px-3 text-white placeholder-gray-300'
							placeholder='r/AskReddit'
							required
						/>
					</div>
					<button className='w-1/2 mt-6 bg-teal-700 py-3 text-center rounded-md text-teal-100'>
						Create Subreddit
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateSubreddit;
