import { db } from './index';
import { doc, setDoc, getDocs, where, collection, query } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const subredditService = {
    async addNewSubreddit(name) {
        await setDoc(doc(db, 'subreddit-names', name), {
            id: uuidv4(),
            name: name,
        });
    },
    
    async getSubredditId(name) {
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
    },
    
    async getSubredditNames() {
        // Returns a list of all subreddit names
        const querySnapshot = await getDocs(collection(db, 'subreddit-names'));
        const names = [];
        querySnapshot.forEach((doc) => {
            names.push(doc.data().name);
        });
        return names;
    },
    
    
    async getSubredditIdFromPostId(postId) {
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
    },
    
    async getSubredditNameFromSubredditId(subredditId) {
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
}

export default subredditService