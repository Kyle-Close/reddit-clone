import React from 'react';

import ReplyIcon from '../../img/reply-icon.png';

function ReplyButton() {
	function handleClick() {
		console.log('Reply button clicked');
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
