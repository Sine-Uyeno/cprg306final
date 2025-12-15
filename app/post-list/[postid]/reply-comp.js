"use client"
import { useState } from "react";

import Link from "next/link";
import { dbGetUserById } from "../../_services/blog-service";

export default function ReplyCompObject( {postObj}){
    const [userInfo, setUserInfo] = useState({});
    let {id, uid, dateTime, text} = postObj;

    dbGetUserById(uid, setUserInfo);

    return (
        <div className="bg-red-950 m-4 p-4 rounded-2xl">
            <ul className="list-disc pl-4 mt-4 text-center">
                <li className="text-sm">{text}</li>
                <li className="text-md font-bold font-serif">{userInfo.displayName}</li>
                <li className="text-md font-bold font-serif">{dateTime}</li>
            </ul>
        </div>
    );
}