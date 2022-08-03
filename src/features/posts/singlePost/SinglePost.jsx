import React, {useEffect, useState} from 'react'
import './singlePost.scss'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import {serverUrl} from "../../variables/variables";
import {UpdatePost} from "../updatePost/UpdatePost";
import {LikeInPost} from "../likePost/LikeInPost";
import {DislikeInPost} from "../likePost/DislikeInPost";

export function SinglePost() {
    let {id} = useParams()
    const parsedStorage = JSON.parse(localStorage.user)

    const [post, getPost] = useState({})
    const [isShown, setIsShown] = useState(false)

    const getOnePost = () => {
        axios(`${serverUrl}/post/${id}`, {headers: {Authorization: `token ${parsedStorage.token}`}})
            .then(res => {
                getPost(res.data)
            })
            .catch(err => console.error(err))
    }
    useEffect(() => {
        getOnePost()
    },[])

    const handleClick = () => {
        setIsShown(current => !current)
    }

    const displayPost = () => {
        const deletePost = () => {
            axios({
                method: 'delete',
                url: `${serverUrl}/post/${id}`,
                mode: "cors",
                headers: {
                    'Authorization': `token ${parsedStorage.token}`
                }
            })
                .then(window.location = "/")
        }
        if (post) {
            return (
                <div className='post'>
                    <h3 className='post__title'>{post.title}</h3>
                    <p className='post__body'>{post.content}</p>
                    <img className="miniature" src={post.imageUrl} alt=""/>
                    <div className="container mt-2 mb-2">
                        <LikeInPost post={post}/>
                        <DislikeInPost post={post}/>
                    </div>
                    {isShown && <UpdatePost idParams={id}/>}
                    <div>
                        <button className="btn btn-outline-info" onClick={handleClick}>EDIT</button>
                        <button className="btn btn-outline-warning" onClick={deletePost}>DELETE</button>
                        <Link to={"/"}>
                            <button className="btn btn-outline-secondary" >GO BACK</button>
                        </Link>
                    </div>
                </div>
            )
        } else {
            return (<h3>No posts yet</h3>)
        }
    }
    return (
        <>
            {displayPost()}
        </>
    )
}