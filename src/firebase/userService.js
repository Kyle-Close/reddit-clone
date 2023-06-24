import { db } from './index';
import { doc, setDoc, getDocs, where, collection, arrayUnion, arrayRemove, query, updateDoc } from 'firebase/firestore';

const userService = {
    async addNewUser(userId, userName, createdAt) {
        await setDoc(doc(db, 'users', userName), {
            userId: userId,
            userName: userName,
            karma: '0',
            createdAt: createdAt,
            subreddits: [],
        });
    },
    
    async getUserById(id) {
        const userQuery = query(collection(db, 'users'), where('userId', '==', id));
        const querySnapshot = await getDocs(userQuery);
        if (querySnapshot.size > 0) {
            const userDoc = querySnapshot.docs[0];
            return userDoc.data();
        } else {
            // User not found with ID
            return null;
        }
    },
    
    async doesUserNameExist(userName) {
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
    },
    
    async addSubredditToUserSubreddits(subredditId, userId) {
        const userIdQuery = query(
            collection(db, 'users'),
            where('userId', '==', userId)
        );
        const postSnapshot = await getDocs(userIdQuery); // Snapshot of all docs
        const docSnapshot = postSnapshot.docs[0]; // Snapshot of just first doc
        const postRef = doc(db, 'users', docSnapshot.id);
    
        if (!postRef) return false;
    
        await updateDoc(postRef, {
            subreddits: arrayUnion(subredditId),
        });
        return true;
    },
    
    async removeSubscribedSubreddit(subredditId, userId) {
        const userIdQuery = query(
            collection(db, 'users'),
            where('userId', '==', userId)
        );
        const postSnapshot = await getDocs(userIdQuery); // Snapshot of all docs
        const docSnapshot = postSnapshot.docs[0]; // Snapshot of just first doc
        const postRef = doc(db, 'users', docSnapshot.id);
    
        if (!postRef) return false;
    
        await updateDoc(postRef, {
            subreddits: arrayRemove(subredditId),
        });
        return true;
    },
    
    async isUserSubscribedToSubreddit(subredditId, userId) {
        console.log(subredditId, userId)
        const userIdQuery = query(
            collection(db, 'users'),
            where('userId', '==', userId)
        );
        const postSnapshot = await getDocs(userIdQuery); // Snapshot of all docs
        const docSnapshot = postSnapshot.docs[0]; // Snapshot of just first doc
    
        const userData = docSnapshot.data().subreddits;
    
        return userData.includes(subredditId);
    }
}

export default userService