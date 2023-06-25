import React from 'react';
import { useNavigate } from 'react-router';

import ReplyIcon from '../../img/reply-icon.png';

function ReplyButton({ commentId }) {
	const navigate = useNavigate();
	function handleClick() {
		navigate(`/reply/${commentId}`);
	}

	return (
		<button
			className='flex gap-1 items-end'
			onClick={handleClick}
		>
			<div className='mb-1'>
				<img src={ReplyIcon} />
			</div>
			<p className='font-semibold'>Reply</p>
		</button>
	);
}

export default ReplyButton;
