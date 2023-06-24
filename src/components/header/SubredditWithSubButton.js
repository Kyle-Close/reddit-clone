import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import {
	addSubredditToUserSubreddits,
	getSubredditId,
	isUserSubscribedToSubreddit,
	removeSubscribedSubreddit,
} from '../../firebase';

function SubredditWithSubButton() {
	const authState = useSelector((state) => state.authState);
	const { subredditName } = useParams();

	const [subredditId, setSubredditId] = React.useState(null);
	const [subscribed, setSubscribed] = React.useState(null);

	React.useEffect(() => {
		const fetchData = async () => {
			await fetchSubredditId();
		};
		fetchData();
	}, []);

	React.useEffect(() => {
		const fetchData = async () => {
			await fetchSubredditId();
		};
		fetchData();
	}, [subredditName, authState]);

	React.useEffect(() => {
		console.log(subscribed);
	}, [subscribed]);

	async function isUserSubscribed(subId) {
		if (!authState || !subId) return;
		const isSubbed = await isUserSubscribedToSubreddit(subId, authState.userId);
		setSubscribed(isSubbed);
	}

	async function fetchSubredditId() {
		const subId = await getSubredditId(subredditName);
		setSubredditId(subId);
		isUserSubscribed(subId);
	}

	async function handleSubscribe() {
		if (!authState || subscribed) return;

		const success = await addSubredditToUserSubreddits(
			subredditId,
			authState.userId
		);

		if (success) {
			console.log('Added subreddit to user list!');
			setSubscribed(true);
		}
	}

	async function handleUnsubscribe() {
		if (!authState || !subscribed) return;

		const success = await removeSubscribedSubreddit(
			subredditId,
			authState.userId
		);

		if (success) {
			//console.log('Removed subreddit from user list!');
			setSubscribed(false);
		}
	}

	return (
		<div className='flex flex-col text-gray-200 gap-1'>
			<h6 className='text-xs'>{`/r/${subredditName.toLowerCase()}`}</h6>
			{!subscribed ? (
				<button
					onClick={handleSubscribe}
					className='border-gray-200 border px-2.5 py-0.5 rounded-full
  text-xs'
				>
					Subscribe
				</button>
			) : (
				<button
					onClick={handleUnsubscribe}
					className='border-gray-200 border px-2.5 py-0.5 rounded-full
text-xs'
				>
					Unsubscribe
				</button>
			)}
		</div>
	);
}

export default SubredditWithSubButton;
