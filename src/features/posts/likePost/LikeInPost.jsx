import React, {useState} from 'react';
import axios from 'axios';
import {serverUrl} from "../../variables/variables";
import {useParams} from 'react-router-dom'

export function LikeInPost({post}) {
    // console.log(JSON.parse(JSON.stringify(post.likes)))
    const [like, setLike] = useState(JSON.parse(JSON.stringify(post.likes)))

    let {id} = useParams()
    const parsedStorage = JSON.parse(localStorage.user)

    let payload = {}
    if (post.usersLiked.includes(parsedStorage.userId)) {
        payload = {
            userId: parsedStorage.userId,
            like: 0
        }
    } else {
        payload = {
            userId: parsedStorage.userId,
            like: 1
        }
    }
    const handleLike = () => {
        axios({
            method: 'post',
            url: `${serverUrl}/post/${id}/like`,
            mode: 'cors',
            headers: {
                Authorization: `token ${parsedStorage.token}`
            },
            data: payload
        })
            .then(res => setLike(res.data.likes)
                // window.location = `/${id}`
    )

    }
    return (
        <>
            <button onClick={handleLike} className="btn btn-outline-success">Like</button>
            <p>{like}</p>
        </>
    )
}