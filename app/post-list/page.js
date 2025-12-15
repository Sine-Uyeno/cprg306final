"use client"

import PostCompObject from "./post-comp"
import { useUserAuth } from "../_utils/auth-context";
import { useEffect, useState } from "react";
import { dbGetAllBlogPosts } from "../_services/blog-service";
import Link from "next/link";



export default function PropsPage(){
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    const [blogPostList, setBlogPostList] = useState([]);

    function handleBlogChange(input){
        setBlogPostList(input)
    }

    useEffect(() => {
        if (user) dbGetAllBlogPosts(setBlogPostList);
    }, [user, blogPostList]);

    

    /*
    let postOne = {
    id: 1,
    uid: null,
    dateTime: "December 14 10:00 AM",
    text: "This is a post.",
    }

    let postTwo = {
    id: 2,
    uid: null,
    dateTime: "December 14 11:00 AM",
    text: "This is also a post.",
    }
    */

return (
    <main>
    { user ? (
        <div>
            <h1 className="text-3xl text-center p-5">List of Posts</h1>
            {blogPostList.map((post) => (
                <li key={post.id}>
                    <PostCompObject postObj={post}/>
                </li>
            ))}
            <div className="flex justify-center">
                <Link href="/" className="p-2 rounded bg-red-400 mt-5 cursor-pointer">Go back</Link>
            </div>
        </div>
    ) : (
        <div>
            <p>You must be signed in to use this page!</p>
        </div>
    )}
    </main>

);
}