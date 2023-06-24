import React from 'react';
import { useParams } from 'react-router';

import Header from '../header/Header';
import SubredditWithSubButton from '../header/SubredditWithSubButton';
import FilterIcon from '../header/FilterIcon';
import ProfileIcon from '../header/ProfileIcon';
import BackButton from '../header/BackButton';

import { subredditService } from '../../firebase';

function PostHeader() {
	const [subredditName, setSubredditName] = React.useState(null);
	const { postId } = useParams();

	React.useEffect(() => {
		getSubredditName();
	}, []);

	async function getSubredditName() {
		const subredditIdValue = await subredditService.getSubredditIdFromPostId(
			postId
		);
		const subredditNameValue =
			await subredditService.getSubredditNameFromSubredditId(subredditIdValue);

		setSubredditName(subredditNameValue);
	}

	return (
		<Header
			justify={'justify-between'}
			gap={'gap-12'}
		>
			<div className='flex gap-12'>
				<BackButton />
				{subredditName && (
					<SubredditWithSubButton subredditName={subredditName} />
				)}
			</div>
			<div className='flex gap-8'>
				<FilterIcon />
				<ProfileIcon />
			</div>
		</Header>
	);
}

export default PostHeader;
