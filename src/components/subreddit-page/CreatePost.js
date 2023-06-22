import React from 'react';

import Header from '../header/Header';
import BackButton from '../header/BackButton';

function CreatePost() {
	function handleInputChange(e) {
		console.log(e.target.value);
	}
	return (
		<div className='flex flex-col h-screen bg-black'>
			<Header justify='justify-between'>
				<BackButton />
			</Header>

			<div className='mx-8 my-6 flex flex-col gap-6 h-full'>
				<input
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
