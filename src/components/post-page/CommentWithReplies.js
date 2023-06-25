import React from 'react';

import CommentImage from '../../img/comment-profile-picture.png';
import CommentInteractionBar from './CommentInteractionBar';

function CommentWithReplies({ commentData, replySection }) {
	const [isExpanded, setIsExpanded] = React.useState();

	function toggleExpanded() {
		setIsExpanded((prev) => !prev);
	}

	return (
		<div>
			<div className='flex gap-3'>
				<div className='w-10 flex-shrink-0'>
					<img
						src={CommentImage}
						alt='commentor profile icon'
					/>
				</div>
				<div className='overflow-auto grow flex flex-col'>
					<p className='text-xs opacity-70'>{`u/${commentData.userName}`}</p>
					<p className='leading-tight'>{commentData.contents}</p>
					<CommentInteractionBar
						commentData={commentData}
						toggleExpanded={toggleExpanded}
						commentId={commentData.commentId}
					/>
				</div>
			</div>
			{isExpanded && (
				<div className='ml-12 mt-2 flex flex-col gap-2'>{replySection}</div>
			)}
		</div>
	);
}

export default CommentWithReplies;
