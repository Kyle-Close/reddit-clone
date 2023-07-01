import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import ProfileModal from '../profile-modal/ProfileModal';
import MenuModal from '../menu-modal/MenuModal';
import SubredditPageHeader from './SubredditPageHeader';
import PostCard from './PostCard';

import { postService, subredditService } from '../../firebase';

function Subreddit() {
	const { subredditName } = useParams();
	const modal = useSelector((state) => state.modal);
	const [postCards, setPostCards] = React.useState(null);
	const [isSubredditValid, setIsSubredditValid] = React.useState(null);

	function renderModal() {
		switch (modal.type) {
			case 'profile':
				return <ProfileModal direction='right' />;
			case 'menu':
				return <MenuModal direction='left' />;
			default:
				return null;
		}
	}

	async function getPostList() {
		const subredditId = await subredditService.getSubredditId(subredditName);
		const postList = await postService.getAllPostsInSubreddit(subredditId);
		createPostCards(postList);
	}

	async function createPostCards(postList) {
		if (postList.length > 0) {
			const cards = postList.map((postData, key) => {
				return (
					<PostCard
						key={key}
						title={postData.title}
						numUpvotes={postData.upvotes}
						numDownvotes={postData.downvotes}
						postId={postData.postId}
						subredditName={subredditName}
					/>
				);
			});
			setPostCards(cards);
		} else {
			setPostCards(null);
		}
	}

	React.useEffect(() => {
		const isSubredditValid = async () => {
			// Check if subreddit exists
			const allSubredditNames = await subredditService.getSubredditNames();
			let isFound = false;
			allSubredditNames.forEach((name) => {
				if (name.toUpperCase() === subredditName.toUpperCase()) {
					isFound = true;
				}
			});
			return isFound;
		};

		// Create an async function and call it immediately
		(async () => {
			const isValid = await isSubredditValid();
			if (!isValid) setIsSubredditValid(false);
			else setIsSubredditValid(true);
		})();
		getPostList();
	}, [subredditName]);

	return isSubredditValid ? (
		<div className='bg-black h-screen max-h-screen overflow-y-scroll'>
			<SubredditPageHeader subredditName={subredditName} />
			{postCards && postCards}
			{!postCards && (
				<h1 className='font-bold text-center mt-8 text-red-500'>
					Looks like there are no posts here yet
					<br />
					<span className='text-gray-300 font-thin'>
						Be the first by clicking the edit icon above.
					</span>
				</h1>
			)}
			{modal.isOpen && renderModal()}
		</div>
	) : (
		<div className='flex h-screen w-screen items-center justify-center bg-black'>
			<div className='text-red-500 text-lg font-semibold'>
				Subreddit does not exist
			</div>
		</div>
	);
}

export default Subreddit;
