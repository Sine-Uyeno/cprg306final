"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useUserAuth } from "../../_utils/auth-context";
import { dbAddBlogReply, dbGetBlogPostById, dbGetAllReply } from "../../_services/blog-service";
import ReplyCompObject from "./reply-comp";

export default function BlogPostPage({params}) {
    const pageParams = use(params);
    const {user} = useUserAuth();
    const [blogPost, setBlogPost] = useState({});
    
    useEffect( () => {
        if (user) dbGetBlogPostById(pageParams.postid, setBlogPost);
    }, [user]);

    const [text, setText] = useState("");
    const [blogPostList, setBlogPostList] = useState([]);

    useEffect(() => {
            if (user) dbGetAllReply(pageParams.postid, setBlogPostList);
    }, [user, blogPostList]);

    const handleTextChange = (event) => {
        console.dir(event.target.value);
        setText(event.target.value);
    }

    function handleSubmit(event) {
    if (user != null) {
        event.preventDefault();
        const now = new Date();
        let newBlogPost = {
            uid: user.uid, 
            text: text,
            dateTime: now.toLocaleDateString() + ' ' + now.toLocaleTimeString()
        }
        
        dbAddBlogReply(pageParams.postid, newBlogPost);
        setText("");
        }
    }

    return (
        <main>
            <h1 className="text-2xl text-center p-5">List of Replies</h1>
            <ReplyCompObject postObj={blogPost}/>
            {blogPostList.map((post) => (
                <li key={post.id}>
                    <ReplyCompObject postObj={post}/>
                </li>
            ))}
            <form className="place-items-center" onSubmit={handleSubmit}>
                <div className="flex flex-col text-center">
                    <label>Contents:</label>
                    <textarea className="border border-solid rounded p-1 mt-5" onChange={handleTextChange} value={text}></textarea>
                </div>
                <div className="flex justify-center">
                    <button className="p-2 rounded bg-red-400 mt-5 cursor-pointer" type="submit">Add Blog Post</button>
                </div>
                <div className="flex justify-center">
                    <Link href="/post-list" className="p-2 rounded bg-red-400 mt-5 cursor-pointer">Go back</Link>
                </div>
            </form>
        </main>
    )
}