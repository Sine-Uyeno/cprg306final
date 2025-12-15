import { addDoc, setDoc, collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../_utils/firebase";

export async function dbAddBlogPost(blogPostObj) {
    try {
        console.log(blogPostObj);
        const newBlogPostReference = collection(db, "blog-posts");
        const newBlogPostPromise = await addDoc(newBlogPostReference, blogPostObj);
        console.log(newBlogPostPromise.id);
    } catch (error) {
        console.log(error);
    }
}

export async function dbAddBlogReply(postId, blogPostObj) {
    try {
        const newBlogPostReference = collection(db, "blog-posts", postId, "reply");
        const newBlogPostPromise = await addDoc(newBlogPostReference, blogPostObj);
        console.log(newBlogPostPromise.id);
    } catch (error) {
        console.log(error);
    }
}

export async function addUser(userId, infoObj) {
    try {
        await setDoc(doc(db, "users", userId), infoObj);
    } catch (error) {
        console.log(error);
    }
}

export async function dbGetUserById(userId, userStateSetter) {
    try {
        const blogPostRef = doc(db, "users", userId);
        const documentSnapshot = await getDoc(blogPostRef);
        if (documentSnapshot.exists()) {
            userStateSetter(documentSnapshot.data());
        } else {
            console.log("This user does not exist in the database.");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function dbGetAllBlogPostsByUserID(userId, setTheThing) {
    try {
        const allBlogPostsReference = collection(db, "blog-posts");
        const allBlogPostsQuery = query(allBlogPostsReference);
        const querySnapshot = await getDocs(allBlogPostsQuery);
        let blogPostList = [];
        
        querySnapshot.forEach((doc) => {
            let thisPost = {
                id: doc.id,
                ...doc.data(),
            }
            if (thisPost.uid == userId)
                blogPostList.push(thisPost);
        });
        setTheThing(blogPostList);
    } catch (error) {
        console.log(error);
    }
}

export async function dbGetAllBlogPosts(setTheThing) {
    try {
        const allBlogPostsReference = collection(db, "blog-posts");
        const allBlogPostsQuery = query(allBlogPostsReference);
        const querySnapshot = await getDocs(allBlogPostsQuery);
        let blogPostList = [];
        
        querySnapshot.forEach((doc) => {
            let thisPost = {
                id: doc.id,
                ...doc.data(),
            }
            blogPostList.push(thisPost);
        });
        setTheThing(blogPostList);
    } catch (error) {
        console.log(error);
    }
}

export async function dbGetAllReply(postId, setTheThing) {
    try {
        const allBlogPostsReference = collection(db, "blog-posts", postId, "reply");
        const allBlogPostsQuery = query(allBlogPostsReference);
        const querySnapshot = await getDocs(allBlogPostsQuery);
        let blogPostList = [];
        
        querySnapshot.forEach((doc) => {
            let thisPost = {
                id: doc.id,
                ...doc.data(),
            }
            blogPostList.push(thisPost);
        });
        setTheThing(blogPostList);
    } catch (error) {
        console.log(error);
    }
}

export async function dbGetBlogPostById(postId, blogPostStateSetter) {
    try {
        const blogPostRef = doc(db, "blog-posts", postId);
        const documentSnapshot = await getDoc(blogPostRef);
        if (documentSnapshot.exists()) {
            blogPostStateSetter(documentSnapshot.data());
        } else {
            console.log("This post does not exist in the database.");
        }
    } catch (error) {
        console.log(error);
    }
}