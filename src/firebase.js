// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
	getFirestore,
	doc,
	setDoc,
	query,
	getDocs,
	where,
	collection,
	addDoc,
	updateDoc,
	increment,
	arrayUnion,
	arrayRemove,
} from 'firebase/firestore';
import { async } from 'q';
import { v4 as uuidv4 } from 'uuid';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBu9YWRwQ9eutVyIrIha8dxe9CAXNgrQEM',
	authDomain: 'reddit-clone-3b1ef.firebaseapp.com',
	projectId: 'reddit-clone-3b1ef',
	storageBucket: 'reddit-clone-3b1ef.appspot.com',
	messagingSenderId: '512565635955',
	appId: '1:512565635955:web:9daf2e091a6cbc43763306',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Access auth
export const auth = getAuth(app);

export default app;

// UTILITY FUNCTIONS
export async function addNewUser(userId, userName, createdAt) {
	await setDoc(doc(db, 'users', userName), {
		userId: userId,
		userName: userName,
		karma: '0',
		createdAt: createdAt,
	});
}

export async function getUserById(id) {
	const userQuery = query(collection(db, 'users'), where('userId', '==', id));
	const querySnapshot = await getDocs(userQuery);
	if (querySnapshot.size > 0) {
		const userDoc = querySnapshot.docs[0];
		return userDoc.data();
	} else {
		// User not found with ID
		return null;
	}
}

export async function doesUserNameExist(userName) {
	const userNameQuery = query(
		collection(db, 'users'),
		where('userName', '==', userName)
	);
	const querySnapshot = await getDocs(userNameQuery);
	if (querySnapshot.size > 0) {
		return true;
	} else {
		// User not found with ID
		return false;
	}
}

export async function getSubredditNames() {
	// Returns a list of all subreddit names
	const querySnapshot = await getDocs(collection(db, 'subreddit-names'));
	const names = [];
	querySnapshot.forEach((doc) => {
		names.push(doc.data().name);
	});
	return names;
}

export async function addNewSubreddit(name) {
	await setDoc(doc(db, 'subreddit-names', name), {
		id: uuidv4(),
		name: name,
	});
}

export async function getSubredditId(name) {
	const subredditQuery = query(
		collection(db, 'subreddit-names'),
		where('name', '==', name)
	);
	const querySnapshot = await getDocs(subredditQuery);
	if (!querySnapshot.empty) {
		return querySnapshot.docs[0].data().id;
	} else {
		// Subreddit does not exist
		return false;
	}
}

export async function createPost(postId, subredditId, title, description) {
	const postsCollection = collection(db, 'posts');
	const timeStamp = Date.now();
	await addDoc(postsCollection, {
		postId: postId,
		subredditId: subredditId,
		title: title,
		description: description,
		upvotes: 0,
		downvotes: 0,
		timeStamp: timeStamp,
	});
}

export async function getAllPostsInSubreddit(subredditId) {
	const postList = [];
	const subredditQuery = query(
		collection(db, 'posts'),
		where('subredditId', '==', subredditId)
	);
	const querySnapshot = await getDocs(subredditQuery);

	if (querySnapshot.empty) return false;
	else {
		querySnapshot.docs.forEach((doc) => {
			postList.push(doc.data());
		});
		return postList;
	}
}

export async function getSubredditIdFromPostId(postId) {
	const postQuery = query(
		collection(db, 'posts'),
		where('postId', '==', postId)
	);
	const querySnapshot = await getDocs(postQuery);
	if (!querySnapshot.empty) {
		return querySnapshot.docs[0].data().subredditId;
	} else {
		// Subreddit does not exist
		return false;
	}
}

export async function getSubredditNameFromSubredditId(subredditId) {
	const postQuery = query(
		collection(db, 'subreddit-names'),
		where('id', '==', subredditId)
	);
	const querySnapshot = await getDocs(postQuery);
	if (!querySnapshot.empty) {
		return querySnapshot.docs[0].data().name;
	} else {
		return false;
	}
}

export async function getPostDataFromPostId(postId) {
	const postQuery = query(
		collection(db, 'posts'),
		where('postId', '==', postId)
	);
	const querySnapshot = await getDocs(postQuery);
	if (!querySnapshot.empty) {
		return querySnapshot.docs[0].data();
	} else {
		return false;
	}
}

function hasUserDownvotedPost(downvoteUsers, userId) {
	if (!Array.isArray(downvoteUsers) || downvoteUsers.length < 1) return false;
	if (downvoteUsers.includes(userId)) {
		return true;
	} else return false;
}

function hasUserUpvotedPost(upvoteUsers, userId) {
	if (!Array.isArray(upvoteUsers) || upvoteUsers.length < 1) return false;
	if (upvoteUsers.includes(userId)) {
		return true;
	} else return false;
}

export async function downvotePost(postId, userId) {
	// Return values:
	//	-1 = removed upvote
	// 	0  = was not able to downvote
	// 	1  = successfully downvoted
	let removedUpvote = false;

	// 1. Find the post the is being downvoted based on id
	const postIdQuery = query(
		collection(db, 'posts'),
		where('postId', '==', postId)
	);
	const postSnapshot = await getDocs(postIdQuery); // Snapshot of all docs
	const docSnapshot = postSnapshot.docs[0]; // Snapshot of just first doc
	const postRef = doc(db, 'posts', docSnapshot.id);

	// 2. Check if user has already downvoted. If yes return
	if (hasUserDownvotedPost(docSnapshot.data().downvoteUsers, userId)) return 0;

	// 3. Check if the user has already upvoted. If yes, remove the upvote
	if (hasUserUpvotedPost(docSnapshot.data().upvoteUsers, userId)) {
		// Remove upvote
		await updateDoc(postRef, {
			upvoteUsers: arrayRemove(userId),
		});

		removedUpvote = true;
	}

	// 4. Can now safely add downvote
	await updateDoc(postRef, {
		downvotes: increment(1),
	});

	// 5. Add user id to downvotes downvoteUsers
	await updateDoc(postRef, {
		downvoteUsers: arrayUnion(userId),
	});

	return removedUpvote ? -1 : 1;
}

export async function upvotePost(postId, userId) {
	// 	Return values:
	//	-1 = removed downvote
	// 	0  = was not able to upvote
	// 	1  = successfully upvoted with no removal
	let removedDownvote = false;

	// 1. Find the post the is being downvoted based on id
	const postIdQuery = query(
		collection(db, 'posts'),
		where('postId', '==', postId)
	);
	const postSnapshot = await getDocs(postIdQuery); // Snapshot of all docs
	const docSnapshot = postSnapshot.docs[0]; // Snapshot of just first doc
	const postRef = doc(db, 'posts', docSnapshot.id);

	// 2. Check if user has already upvoted. If yes return
	if (hasUserUpvotedPost(docSnapshot.data().upvoteUsers, userId)) return 0;

	// 3. Check if the user has already upvoted. If yes, remove the upvote
	if (hasUserDownvotedPost(docSnapshot.data().downvoteUsers, userId)) {
		// Remove downvote
		await updateDoc(postRef, {
			downvoteUsers: arrayRemove(userId),
		});
		// Decrement downvote count
		await updateDoc(postRef, {
			downvotes: increment(-1),
		});
		removedDownvote = true;
	}

	// 4. Can now safely add upvote
	await updateDoc(postRef, {
		upvotes: increment(1),
	});

	// 5. Add user id to upvoteUsers
	await updateDoc(postRef, {
		upvoteUsers: arrayUnion(userId),
	});

	return removedDownvote ? -1 : 1;
}
