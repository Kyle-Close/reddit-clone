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
	async hasUserUpvotedComment(userId, commentId){
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];
		const upvoteUsersList = docSnapshot.data().upvoteUsers;

		if(upvoteUsersList.includes(userId)) return true
		else return false
	},
	async hasUserDownvotedComment(userId, commentId){
		const commentIdQuery = query(
			collection(db, 'comments'),
			where('commentId', '==', commentId)
		);
		const postSnapshot = await getDocs(commentIdQuery);
		const docSnapshot = postSnapshot.docs[0];
		const downvoteUsersList = docSnapshot.data().downvoteUsers;
		if(downvoteUsersList.includes(userId)) return true
		else return false
	},
	async incrementCommentUpvote(commentId){
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
	async incrementCommentDownvote(commentId){
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
	async addUserToUpvoteUsers(userId, commentId){
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
	async removeDownvoteUser(userId, commentId){
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
	async decrementCommentDownvote(commentId){
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
	async removeUpvoteUser(userId, commentId){
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
	async decrementCommentUpvote(commentId){
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
	async addUserToDownvoteUsers(userId, commentId){
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
	}
};

export default commentService;
