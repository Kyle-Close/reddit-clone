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
} from 'firebase/firestore';

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
