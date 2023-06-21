import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

import { addNewUser, doesUserNameExist } from './firebase';

export async function createNewUser(auth, email, password, userName) {
	// Check if user name exists in cloud user database
	if (await doesUserNameExist(userName)) {
		console.log('Username already exists');
		return 'Username already exists';
	} else {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			const { createdAt } = user.metadata;
			// 2. Add user to user name database on cloud
			const { uid } = user;
			await addNewUser(uid, userName, createdAt);

			return true;
		} catch (error) {
			const errorMessage = error.message;
			return errorMessage;
		}
	}
}

export async function signInUser(auth, email, password) {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		return true;
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;

		return false;
	}
}

export function monitorAuthState(auth, callbackFn) {
	onAuthStateChanged(auth, callbackFn);
}

export async function logout(auth) {
	await signOut(auth);
}
