import { db } from './index';
import { doc, addDoc, getDocs, where, collection, arrayUnion, arrayRemove, increment, query, updateDoc } from 'firebase/firestore';

const postService = {
    async createPost(postId, subredditId, title, description) {
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
    },
    
    async getAllPostsInSubreddit(subredditId) {
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
    },
    
    async getPostDataFromPostId(postId) {
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
    },
    
    hasUserDownvotedPost(downvoteUsers, userId) {
        if (!Array.isArray(downvoteUsers) || downvoteUsers.length < 1) return false;
        if (downvoteUsers.includes(userId)) {
            return true;
        } else return false;
    },
    
    hasUserUpvotedPost(upvoteUsers, userId) {
        if (!Array.isArray(upvoteUsers) || upvoteUsers.length < 1) return false;
        if (upvoteUsers.includes(userId)) {
            return true;
        } else return false;
    },
    
    async upvotePost(postId, userId) {
        let removedDownvote = false;
    
        const postIdQuery = query(
            collection(db, 'posts'),
            where('postId', '==', postId)
        );
        const postSnapshot = await getDocs(postIdQuery);
        const docSnapshot = postSnapshot.docs[0];
        const postRef = doc(db, 'posts', docSnapshot.id);
    
        if (this.hasUserUpvotedPost(docSnapshot.data().upvoteUsers, userId)) return 0;
    
        if (this.hasUserDownvotedPost(docSnapshot.data().downvoteUsers, userId)) {
            await updateDoc(postRef, {
                downvoteUsers: arrayRemove(userId),
            });
            await updateDoc(postRef, {
                downvotes: increment(-1),
            });
            removedDownvote = true;
        }
    
        await updateDoc(postRef, {
            upvotes: increment(1),
        });
    
        await updateDoc(postRef, {
            upvoteUsers: arrayUnion(userId),
        });
    
        return removedDownvote ? -1 : 1;
    },
    
    async downvotePost(postId, userId) {
        let removedUpvote = false;
    
        const postIdQuery = query(
            collection(db, 'posts'),
            where('postId', '==', postId)
        );
        const postSnapshot = await getDocs(postIdQuery);
        const docSnapshot = postSnapshot.docs[0];
        const postRef = doc(db, 'posts', docSnapshot.id);
    
        if (this.hasUserDownvotedPost(docSnapshot.data().downvoteUsers, userId)) return 0;
    
        if (this.hasUserUpvotedPost(docSnapshot.data().upvoteUsers, userId)) {
            await updateDoc(postRef, {
                upvoteUsers: arrayRemove(userId),
            });
            removedUpvote = true;
        }
    
        await updateDoc(postRef, {
            downvotes: increment(1),
        });
    
        await updateDoc(postRef, {
            downvoteUsers: arrayUnion(userId),
        });
    
        return removedUpvote ? -1 : 1;
    }
}

export default postService;
