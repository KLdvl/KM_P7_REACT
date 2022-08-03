import React from 'react';
import axios from 'axios';
import {serverUrl} from "../../variables/variables";
import {useParams} from 'react-router-dom'

export function DislikeInPost({post}) {

    let {id} = useParams()
    const parsedStorage = JSON.parse(localStorage.user)

    let payload = {}
    if(post.usersDisliked.includes(parsedStorage.userId)) {
        payload = {
            userId: parsedStorage.userId,
            like: 0
        }
    } else {
        payload = {
            userId: parsedStorage.userId,
            like: -1
        }
    }
    const handleDislike = () => {
        axios({
            method: 'post',
            url: `${serverUrl}/post/${id}/like`,
            mode: 'cors',
            headers: {
                Authorization: `token ${parsedStorage.token}`
            },
            data: payload
        })
            .then(window.location = `/${id}`)
    }
    return (
        <>
            <button onClick={handleDislike} className="btn btn-outline-danger">Dislike</button>
            <span>{post.dislikes}</span>
        </>
    )
}