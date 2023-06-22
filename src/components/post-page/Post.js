import React from 'react';
import { useParams } from 'react-router';
import Header from '../header/Header';
import BackButton from '../header/BackButton';
import SubredditWithSubButton from '../header/SubredditWithSubButton';
import {
	getSubredditIdFromPostId,
	getSubredditNameFromSubredditId,
} from '../../firebase';
import ProfileIcon from '../header/ProfileIcon';
import { useSelector } from 'react-redux';
import ProfileModal from '../profile-modal/ProfileModal';
import MenuModal from '../menu-modal/MenuModal';

function Post() {
	const { postId } = useParams();
	const [subredditName, setSubredditName] = React.useState(null);

	const modal = useSelector((state) => state.modal);

	React.useEffect(() => {
		getSubredditName();
	}, []);

	async function getSubredditName() {
		const subredditIdValue = await getSubredditIdFromPostId(postId);
		const subredditNameValue = await getSubredditNameFromSubredditId(
			subredditIdValue
		);

		setSubredditName(subredditNameValue);
	}

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

	return (
		<div>
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
				<div>
					{/* <FilterIcon /> */}
					<ProfileIcon />
				</div>
			</Header>
			{modal.isOpen && renderModal()}
		</div>
	);
}

export default Post;
