import React from 'react';
import { useParams } from 'react-router';

import Header from '../header/Header';
import BackButton from '../header/BackButton';
import PostButton from '../header/PostButton';

function CreatePost() {
	const { subredditName } = useParams();

	function handleInputChange(e) {
		console.log(e.target.value);
	}
	return (
		<div className='flex flex-col h-screen bg-black text-gray-200'>
			<Header gap='gap-12'>
				<BackButton />
				<h1 className='font-semibold text-lg'>{`/r/${subredditName.toLowerCase()}`}</h1>
				<div className='grow h-full flex justify-end items-center mr-6'>
					<PostButton />
				</div>
			</Header>

			<div className='mx-8 my-6 flex flex-col gap-6 h-full'>
				<input
					maxLength={50}
					onChange={handleInputChange}
					className='bg-zinc-600 h-12 rounded-md px-3 text-white placeholder-gray-400'
					placeholder='Title'
					required
				/>
				<textarea
					maxLength={10000}
					onChange={handleInputChange}
					className='bg-zinc-600 h-full rounded-md py-3 px-3 text-white placeholder-gray-400'
					placeholder='Description'
					required
				/>
			</div>
		</div>
	);
}

export default CreatePost;
