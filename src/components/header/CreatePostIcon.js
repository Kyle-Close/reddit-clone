import React from 'react';
import { useParams, useNavigate } from 'react-router';

import CreatePostIconImg from '../../img/create-post-icon.png';

function CreatePostIcon() {
	const { subredditName } = useParams();
	const navigate = useNavigate();
	function handleCreatePost() {
		navigate(`/r/${subredditName}/create_post`);
	}
	return (
		<button
			onClick={handleCreatePost}
			className='h-3/5 aspect-auto'
		>
			<img src={CreatePostIconImg} />
		</button>
	);
}

export default CreatePostIcon;
