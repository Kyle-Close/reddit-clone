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
			replies: [],
		});
	},
	async getCommentsFromPostId(postId) {
		const commentList = [];
		const commentQuery = query(
			collection(db, 'comments'),
			where('postId', '==', postId)
		);
		const querySnapshot = await getDocs(commentQuery);

		if (querySnapshot.empty) return false;
		else {
			querySnapshot.docs.forEach((doc) => {
				commentList.push(doc.data());
			});
			return commentList;
		}
	},
	async getCommentFromCommentId(commentId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const commentSnapshot = await getDocs(commentIdQuery);

		if (commentSnapshot.empty) return;
		else {
			const docSnapshot = commentSnapshot.docs[0];
			return docSnapshot.data();
		}
	},
	async addReplyToComment(commentId, replyData) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];
		const postRef = doc(db, 'comments', docSnapshot.id);

		await updateDoc(postRef, {
			replies: arrayUnion(replyData),
		});
	},
	async hasUserUpvotedComment(userId, commentId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];
		const upvoteUsersList = docSnapshot.data().upvoteUsers;

		if (upvoteUsersList.includes(userId)) return true;
		else return false;
	},
	async hasUserDownvotedComment(userId, commentId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];
		const downvoteUsersList = docSnapshot.data().downvoteUsers;
		if (downvoteUsersList.includes(userId)) return true;
		else return false;
	},
	async incrementCommentUpvote(commentId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];
		const postRef = doc(db, 'comments', docSnapshot.id);

		await updateDoc(postRef, {
			upvotes: increment(1),
		});
	},
	async incrementCommentDownvote(commentId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];
		const postRef = doc(db, 'comments', docSnapshot.id);

		await updateDoc(postRef, {
			downvotes: increment(1),
		});
	},
	async addUserToUpvoteUsers(userId, commentId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];
		const postRef = doc(db, 'comments', docSnapshot.id);

		await updateDoc(postRef, {
			upvoteUsers: arrayUnion(userId),
		});
	},
	async removeDownvoteUser(userId, commentId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];
		const postRef = doc(db, 'comments', docSnapshot.id);

		await updateDoc(postRef, {
			downvoteUsers: arrayRemove(userId),
		});
	},
	async decrementCommentDownvote(commentId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];
		const postRef = doc(db, 'comments', docSnapshot.id);

		await updateDoc(postRef, {
			downvotes: increment(-1),
		});
	},
	async removeUpvoteUser(userId, commentId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];
		const postRef = doc(db, 'comments', docSnapshot.id);

		await updateDoc(postRef, {
			upvoteUsers: arrayRemove(userId),
		});
	},
	async decrementCommentUpvote(commentId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];
		const postRef = doc(db, 'comments', docSnapshot.id);

		await updateDoc(postRef, {
			upvotes: increment(-1),
		});
	},
	async addUserToDownvoteUsers(userId, commentId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];
		const postRef = doc(db, 'comments', docSnapshot.id);

		await updateDoc(postRef, {
			downvoteUsers: arrayUnion(userId),
		});
	},
	async removeReplyDownvoteUser(userId, commentId, replyId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);

		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];

		const commentData = docSnapshot.data();
		const repliesList = commentData.replies;
		const commentRef = doc(db, 'comments', docSnapshot.id);

		// Find reply from replyId
		const replyIndex = repliesList.findIndex(
			(reply) => reply.replyId === replyId
		);
		const replyDownvoteUsersList = repliesList[replyIndex].downvoteUsers;

		// Find userId in downvote list
		const userIndex = replyDownvoteUsersList.findIndex(
			(user) => user === userId
		);
		replyDownvoteUsersList.splice(userIndex, 1);

		// Update the comment document with the updated replies array
		await updateDoc(commentRef, { replies: repliesList });
	},
	async decrementReplyDownvote(commentId, replyId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];

		const commentData = docSnapshot.data();
		const repliesList = commentData.replies;
		const commentRef = doc(db, 'comments', docSnapshot.id);

		// Find reply from replyId
		let replyIndex = repliesList.findIndex(
			(reply) => reply.replyId === replyId
		);
		repliesList[replyIndex].downvotes = repliesList[replyIndex].downvotes - 1;

		await updateDoc(commentRef, { replies: repliesList });
	},
	async incrementReplyUpvote(commentId, replyId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];

		const commentData = docSnapshot.data();
		const repliesList = commentData.replies;
		const commentRef = doc(db, 'comments', docSnapshot.id);

		// Find reply from replyId
		let replyIndex = repliesList.findIndex(
			(reply) => reply.replyId === replyId
		);
		repliesList[replyIndex].upvotes = repliesList[replyIndex].upvotes + 1;

		await updateDoc(commentRef, { replies: repliesList });
	},
	async addUserToReplyUpvoteUsers(userId, commentId, replyId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];

		const commentData = docSnapshot.data();
		const repliesList = commentData.replies;
		const commentRef = doc(db, 'comments', docSnapshot.id);

		// Find reply from replyId
		let replyIndex = repliesList.findIndex(
			(reply) => reply.replyId === replyId
		);

		repliesList[replyIndex].upvoteUsers = [
			...repliesList[replyIndex].upvoteUsers,
			userId,
		];

		await updateDoc(commentRef, { replies: repliesList });
	},
	async hasUserUpvotedReply(userId, commentId, replyId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];

		const commentData = docSnapshot.data();
		const repliesList = commentData.replies;

		// Find reply from replyId
		let replyIndex = repliesList.findIndex(
			(reply) => reply.replyId === replyId
		);

		if (repliesList[replyIndex].upvoteUsers.includes(userId)) return true;
		else return false;
	},
	async hasUserDownvotedReply(userId, commentId, replyId) {
		console.log('test');
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];

		const commentData = docSnapshot.data();
		const repliesList = commentData.replies;

		// Find reply from replyId
		let replyIndex = repliesList.findIndex(
			(reply) => reply.replyId === replyId
		);

		if (repliesList[replyIndex].downvoteUsers.includes(userId)) return true;
		else return false;
	},
	async removeReplyUpvoteUser(userId, commentId, replyId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);

		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];

		const commentData = docSnapshot.data();
		const repliesList = commentData.replies;
		const commentRef = doc(db, 'comments', docSnapshot.id);

		// Find reply from replyId
		const replyIndex = repliesList.findIndex(
			(reply) => reply.replyId === replyId
		);
		const replyUpvoteUsersList = repliesList[replyIndex].upvoteUsers;

		// Find userId in downvote list
		const userIndex = replyUpvoteUsersList.findIndex((user) => user === userId);
		replyUpvoteUsersList.splice(userIndex, 1);

		// Update the comment document with the updated replies array
		await updateDoc(commentRef, { replies: repliesList });
	},
	async decrementReplyUpvote(commentId, replyId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];

		const commentData = docSnapshot.data();
		const repliesList = commentData.replies;
		const commentRef = doc(db, 'comments', docSnapshot.id);

		// Find reply from replyId
		let replyIndex = repliesList.findIndex(
			(reply) => reply.replyId === replyId
		);

		repliesList[replyIndex].upvotes = repliesList[replyIndex].upvotes - 1;

		await updateDoc(commentRef, { replies: repliesList });
	},
	async incrementReplyDownvote(commentId, replyId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];

		const commentData = docSnapshot.data();
		const repliesList = commentData.replies;
		const commentRef = doc(db, 'comments', docSnapshot.id);

		// Find reply from replyId
		let replyIndex = repliesList.findIndex(
			(reply) => reply.replyId === replyId
		);
		repliesList[replyIndex].downvotes = repliesList[replyIndex].downvotes + 1;

		await updateDoc(commentRef, { replies: repliesList });
	},
	async addUserToReplyDownvoteUsers(userId, commentId, replyId) {
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];

		const commentData = docSnapshot.data();
		const repliesList = commentData.replies;
		const commentRef = doc(db, 'comments', docSnapshot.id);

		// Find reply from replyId
		let replyIndex = repliesList.findIndex(
			(reply) => reply.replyId === replyId
		);

		repliesList[replyIndex].downvoteUsers = [
			...repliesList[replyIndex].downvoteUsers,
			userId,
		];

		await updateDoc(commentRef, { replies: repliesList });
	},
};

export default commentService;
