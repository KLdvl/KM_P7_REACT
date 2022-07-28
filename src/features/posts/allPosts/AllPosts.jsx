import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {PostCard} from './postCard/PostCard'
import { serverUrl } from '../../variables/variables'

export function AllPosts() {
    const [posts, getPosts] = useState('')



    const getAllPosts = () => {
        const parsedStorage = JSON.parse(localStorage.user)
        axios(`${serverUrl}/post/`, { headers: { Authorization: `token ${parsedStorage.token}` } })
            .then(res => {
                getPosts(res.data)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getAllPosts()
    }, [])

    return (
        <PostCard posts={posts}/>
    )
}