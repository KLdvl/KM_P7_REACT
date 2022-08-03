import React from 'react';
import axios from 'axios';
import {serverUrl} from "../../variables/variables";
import {useParams} from 'react-router-dom'

export function LikeInPost({post}) {


    let {id} = useParams()
    const parsedStorage = JSON.parse(localStorage.user)

    const payload = post.usersLiked.includes(parsedStorage.userId) ?
        {userId: parsedStorage.userId, like: 0} :
        {userId: parsedStorage.userId, like: 1}

    const handleLike = () => {
        axios({
            method: 'post',
            url: `${serverUrl}/post/${id}/like`,
            mode: 'cors',
            headers: {
                'Authorization': `token ${parsedStorage.token}`
            },
            data: payload
        })
            .then(window.location = `/${id}`)

    }
    return (
        <>
            <button onClick={handleLike} className="btn btn-outline-success">Like</button>
            <p>{post.likes}</p>
        </>
    )
}