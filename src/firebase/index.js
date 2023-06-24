// Firebase initialization code
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBu9YWRwQ9eutVyIrIha8dxe9CAXNgrQEM',
	authDomain: 'reddit-clone-3b1ef.firebaseapp.com',
	projectId: 'reddit-clone-3b1ef',
	storageBucket: 'reddit-clone-3b1ef.appspot.com',
	messagingSenderId: '512565635955',
	appId: '1:512565635955:web:9daf2e091a6cbc43763306',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Import and export your services here
export { default as userService } from './userService';
export { default as postService } from './postService';
export { default as subredditService } from './subredditService';
