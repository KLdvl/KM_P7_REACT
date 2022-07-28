import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {PostSingle} from './postSingle/PostSingle'
import { serverUrl } from '../../variables/variables'



export function AllPosts() {
    const [post, getPost] = useState('')

    const parsedStorage = JSON.parse(localStorage.user)
    const id = route.params.id

    const getOnePost = () => {
        axios(`${serverUrl}/post/${id}`, { headers: { Authorization: `token ${parsedStorage.token}` } })
            .then(res => {
                getPost(res.data)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getOnePost()
    }, [])

    return (
        <PostSingle post={post}/>
    )
}