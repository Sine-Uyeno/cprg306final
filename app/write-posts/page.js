"use client";

import Link from "next/link"
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context"
import { dbAddBlogPost } from "../_services/blog-service";

export default function WritePostComp(){

    const {user} = useUserAuth();
    const [text, setText] = useState("");

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
        
        dbAddBlogPost(newBlogPost);
        setText("");
        }
    }

    return(
        <main>
            <header>
                <h1 className="text-3xl p-5 text-center">Add a new blog post!</h1>
            </header>
            <form className="place-items-center" onSubmit={handleSubmit}>
                <div className="flex flex-col text-center">
                    <label>Contents:</label>
                    <textarea className="border border-solid rounded p-1 mt-5" onChange={handleTextChange} value={text}></textarea>
                </div>
                <div className="flex justify-center">
                    <button className="p-2 rounded bg-red-400 mt-5 cursor-pointer" type="submit">Add Blog Post</button>
                </div>
                <div className="flex justify-center">
                    <Link href="/" className="p-2 rounded bg-red-400 mt-5 cursor-pointer">Go back</Link>
                </div>
            </form>
        </main>
    );
}