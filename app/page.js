"use client"

import Link from "next/link";

import { useUserAuth } from "./_utils/auth-context";
import { addUser } from "./_services/blog-service";
import { useEffect } from "react";


export default function MainPage(){

  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  let navBarStyle = "bg-red-950 pb-1 text-center divide-x w-full";

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (user) 
      addUser(user.uid, {
        displayName: user.displayName,
        email: user.email,
      });
  }, [user]);
  

  return(
    <div className="min-h-screen">
      <main className="p-4">
        <header className="mb-4 text-center">
            <h1 className="text-5xl font-bold">Welcome to Redsky!</h1>
        </header>
          { user ? (
            <div>
              <section>
                <div>
                  <h1 className="text-2xl text-center">About us</h1>
                </div>
                <div>
                  <p className="text-center p-5">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
                  <p className="text-center p-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper nec nunc nec auctor. Phasellus pulvinar sit amet leo quis vestibulum. Nunc euismod quis dui eu volutpat. Vestibulum sed vestibulum nisi, nec pellentesque lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sit amet lobortis ex. Donec sodales tristique mauris, sit amet mollis elit blandit vehicula. Mauris non fermentum dolor.</p>
                  <p className="text-center p-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at leo leo. Vestibulum vitae interdum arcu, a eleifend felis. Praesent sit amet viverra lacus. Ut sit amet congue libero. Sed pulvinar massa justo, eget rhoncus lectus lacinia non. Curabitur lacinia justo magna, id placerat erat mollis pretium. Vivamus rutrum id magna at volutpat. Donec nunc libero, varius id urna aliquam, sollicitudin dapibus tortor. Nunc bibendum malesuada pretium.</p>
                  <p className="text-center p-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet hendrerit massa. Nam sit amet metus eu leo aliquam cursus eget quis lacus. Quisque luctus, ex congue egestas porttitor, massa ligula consectetur purus, et iaculis erat est ac augue. Maecenas in semper ex, lobortis varius nulla. Ut tempor volutpat elit at varius. Pellentesque sagittis faucibus ligula, sit amet sollicitudin mauris cursus ac. Vivamus tristique feugiat risus, eu malesuada mauris vehicula ac. Duis nulla tellus, fringilla at malesuada eu, aliquam eu nulla. Mauris at tincidunt nibh. Donec eu turpis odio.</p>
                  <p className="text-center p-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus vehicula nisi, non sollicitudin urna consectetur quis. Etiam at mauris eu mauris lacinia facilisis. Morbi tincidunt, ante sit amet eleifend placerat, est neque pretium mi, sed tempor urna nisl sed ligula. Praesent non mattis dolor. In id porttitor purus. Vestibulum felis elit, euismod sed sollicitudin ac, consequat et purus. Nullam vitae enim vel justo mattis posuere. Cras in sem vel est cursus hendrerit nec quis lacus. Aliquam id magna vehicula, porta velit vitae, pulvinar tellus. Suspendisse non fringilla sapien. Morbi rhoncus sapien quam, quis suscipit ex vulputate vel. Sed metus lorem, accumsan vitae ipsum porta, aliquet mattis felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam consequat a eros vitae luctus. In metus velit, lobortis at bibendum non, blandit ut dolor. Ut laoreet finibus purus vitae fringilla.</p>
                </div>
              </section>
              <footer className="flex justify-center sticky bottom-0">
                <div className={navBarStyle}>
                  <Link href="profile" className="px-4">Profile</Link>
                  <Link href="post-list" className="px-4">View posts</Link>
                  <Link href="write-posts" className="px-4">Write a post</Link>
                  <button type="button" onClick={handleSignOut} className="px-4 cursor-pointer">Sign Out</button>
                </div>
              </footer>
            </div>
        ) : (
          <div>
            <section>
              <div>
                <p>Welcome!</p>
              </div>
            </section>
            <section>
              <button type="button" onClick={handleSignIn}>Sign In with Github</button>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}