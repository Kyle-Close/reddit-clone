// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

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

//1687242554211
