import React from 'react';
import { useParams, useNavigate } from 'react-router';

import Header from '../header/Header';
import BackButton from '../header/BackButton';
import PostButton from '../header/PostButton';
import { createPost, getSubredditId } from '../../firebase';
import { uuidv4 } from '@firebase/util';

function CreatePost() {
	const navigate = useNavigate();
	const [title, setTitle] = React.useState(null);
	const [description, setDescription] = React.useState(null);
	const { subredditName } = useParams();

	function isPostValid() {
		let isValid = true;
		if (!title || title.length < 1) isValid = false;
		if (!description || description.length < 1) isValid = false;
		return isValid;
	}

	function handleTitleInputChange(e) {
		setTitle(e.target.value);
	}

	function handleDescriptionInputChange(e) {
		setDescription(e.target.value);
	}

	async function handleSubmit() {
		// 0. Check if title and description are filled out
		if (!isPostValid()) {
			console.log('invalid');
			return;
		}
		// 0. Generate post id
		const postId = uuidv4();
		// 1. Get subreddit id
		const subredditId = await getSubredditId(subredditName);
		// 2. Add post to "posts" collection
		createPost(postId, subredditId, title, description);
		// 3. Navigate user to post page
		navigate(`/r/${subredditName}/${postId}`);
	}

	return (
		<div className='flex flex-col h-screen bg-black text-gray-200'>
			<Header gap='gap-12'>
				<BackButton />
				<h1 className='font-semibold text-lg'>{`/r/${subredditName.toLowerCase()}`}</h1>
				<div className='grow h-full flex justify-end items-center mr-6'>
					<PostButton handleSubmit={handleSubmit} />
				</div>
			</Header>

			<div className='mx-8 my-6 flex flex-col gap-6 h-full'>
				<input
					maxLength={50}
					onChange={handleTitleInputChange}
					className='bg-zinc-600 h-12 rounded-md px-3 text-white placeholder-gray-400'
					placeholder='Title'
					required
				/>
				<textarea
					maxLength={10000}
					onChange={handleDescriptionInputChange}
					className='bg-zinc-600 h-full rounded-md py-3 px-3 text-white placeholder-gray-400'
					placeholder='Description'
					required
				/>
			</div>
		</div>
	);
}

export default CreatePost;
