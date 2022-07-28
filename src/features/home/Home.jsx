import React from 'react';
import { Link } from 'react-router-dom'
import {AllPosts} from "../posts/allPosts/AllPosts";




export function Home() {
    return (
        <div>
            <div>
                <Link to="/createPost">Click here to add a new post</Link>
            </div>
            <AllPosts />
        </div>
    )
}