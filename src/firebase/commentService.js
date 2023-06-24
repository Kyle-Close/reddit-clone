import { db } from './index';
import {
	doc,
	addDoc,
	getDocs,
	where,
	collection,
	arrayUnion,
	arrayRemove,
	increment,
	query,
	updateDoc,
} from 'firebase/firestore';

const commentService = {
	async createComment(commentId, postId, contents, userId) {
		const postsCollection = collection(db, 'comments');
		const timeStamp = Date.now();
		await addDoc(postsCollection, {
			commentId: commentId,
			postId: postId,
			userId: userId,
			contents: contents,
			upvotes: 0,
			downvotes: 0,
			upvoteUsers: [],
			downvoteUsers: [],
			timeStamp: timeStamp,
		});
	},
};

export default commentService;
