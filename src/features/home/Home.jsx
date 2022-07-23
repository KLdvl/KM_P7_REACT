import React from 'react';
import { Link } from 'react-router-dom'

export function Home() {
    return (
        <div>
            <div>
                <Link to="/createPost">Click here to add a new post</Link>
            </div>
            <p>Home</p>
        </div>
    )
}