import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { subredditService, userService } from '../../firebase';

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

	async function isUserSubscribed(subId) {
		if (!authState || authState.userId === null || !subId) return;

		const isSubbed = await userService.isUserSubscribedToSubreddit(
			subId,
			authState.userId
		);
		setSubscribed(isSubbed);
	}

	async function fetchSubredditId() {
		const subId = await subredditService.getSubredditId(subredditName);
		setSubredditId(subId);
		await isUserSubscribed(subId);
	}

	async function handleSubscribe() {
		if (!authState || subscribed) return;

		const success = await userService.addSubredditToUserSubreddits(
			subredditId,
			authState.userId
		);

		if (success) {
			setSubscribed(true);
		}
	}

	async function handleUnsubscribe() {
		if (!authState || !subscribed) return;

		const success = await userService.removeSubscribedSubreddit(
			subredditId,
			authState.userId
		);

		if (success) {
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
