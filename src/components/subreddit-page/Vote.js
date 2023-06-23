import React from 'react';
import UpvoteButton from './UpvoteButton';
import DownvoteButton from './DownvoteButton';

function Vote({ postId, numUpvotes, numDownvotes }) {
	const [upvotes, setUpvotes] = React.useState(numUpvotes);
	const [downvotes, setDownvotes] = React.useState(numDownvotes);

	return (
		<>
			{upvotes && (
				<>
					<UpvoteButton
						postId={postId}
						numUpvotes={upvotes}
						setUpvotes={setUpvotes}
						setDownvotes={setDownvotes}
					/>
					<DownvoteButton
						postId={postId}
						numDownvotes={downvotes}
						setUpvotes={setUpvotes}
						setDownvotes={setDownvotes}
					/>
				</>
			)}
		</>
	);
}

export default Vote;
