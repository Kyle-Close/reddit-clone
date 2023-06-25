import React from 'react';

import CommentProfilePicture from '../../img/comment-profile-picture.png';
import CommentVote from './CommentVote';
import { userService } from '../../firebase';

function Reply({ replyData }) {
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
				<div className='w-6'>
					<img src={CommentProfilePicture} />
				</div>
				<div>
					<p className='text-xs opacity-70'>{`u/${userName}`}</p>
					<h1>{replyData.replyText}</h1>
					<CommentVote />
				</div>
			</div>
		)
	);
}

export default Reply;
