import React from 'react';

import CommentExpandImage from '../../img/expand-icon.png';

function RepliesButton({ toggleExpanded, commentData }) {
	const [numReplies, setNumReplies] = React.useState(null);

	React.useEffect(() => {
		setNumReplies(commentData.replies.length);
	}, []);

	function handleClick() {
		toggleExpanded();
	}

	return (
		<button
			onClick={handleClick}
			className='mt-2 flex items-center gap-2'
		>
			<div>
				<img src={CommentExpandImage} />
			</div>

			<p className='text-blue-400 font-semibold'>{`${numReplies} Replies`}</p>
		</button>
	);
}

export default RepliesButton;
