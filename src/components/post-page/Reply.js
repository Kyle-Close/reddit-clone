import React from 'react';

import CommentProfilePicture from '../../img/comment-profile-picture.png';
import ReplyVote from './ReplyVote';
import { userService } from '../../firebase';

function Reply({ replyData, commentId }) {
	const [userName, setUserName] = React.useState(null);

	React.useEffect(() => {
		const fetchUserName = async () => {
			const userData = await userService.getUserById(replyData.userId);
			setUserName(userData.userName);
		};
		fetchUserName();
	}, []);

	return (
		userName && (
			<div className='flex gap-2'>
				<div className='w-6 flex-shrink-0'>
					<img
						src={CommentProfilePicture}
						className='w-full h-auto'
						alt='Profile'
					/>
				</div>
				<div className='flex flex-col min-w-0'>
					<p className='text-xs opacity-70'>{`u/${userName}`}</p>
					<h1 className='whitespace-normal overflow-auto break-words'>
						{replyData.replyText}
					</h1>
					<ReplyVote commentId={commentId} replyData={replyData} />
				</div>
			</div>
		)
	);
}

export default Reply;
