"use client";

import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";;
import PostCompObject from "../post-list/post-comp";
import { useState, useEffect } from "react";
import { dbGetAllBlogPostsByUserID } from "../_services/blog-service";

export default function Profile(){
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const [blogPostList, setBlogPostList] = useState([]);

  useEffect(() => {
      if (user) dbGetAllBlogPostsByUserID(user.uid, setBlogPostList);
  }, [user, blogPostList]);

  return(
      <main>
        {user ? (
          <div>
          <header className="mt-4 mb-4">
              <h1 className="text-3xl text-center font-bold">Profile</h1>
          </header>
          <section className="flex justify-center">
            <div>
              <img src={user.photoURL} className="w-50 h-50 rounded-full" />
            </div>
          </section>
          <section>
            <div>
              <ul className="text-center mt-10 flex-col">
                <li>Username: {user.displayName}</li>
                <li className="py-5">Email: {user.email}</li>
              </ul>
            </div>
          </section>
          <section>
              <h1 className="text-2xl text-center">Your Posts!</h1>
              {blogPostList.map((post) => (
                  <li key={post.id}>
                      <PostCompObject postObj={post}/>
                  </li>
              ))}
          </section>
          <section>
            <div className="flex justify-center">
              <Link href="/" className="p-2 rounded bg-red-400 mt-5 cursor-pointer">Go back</Link>
            </div>
          </section>
          </div>
        ) : (
          <p>You need an account to view this page!</p>
        )}
          
      </main>
  )
}