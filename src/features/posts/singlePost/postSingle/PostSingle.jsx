import React, {useState} from 'react'
import './postSingle.scss'
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {serverUrl} from "../../../variables/variables";
import {UpdatePost} from "../../updatePost/UpdatePost";
import {LikeInPost} from "../../likePost/LikeInPost";
import {DislikeInPost} from "../../likePost/DislikeInPost";

export function PostSingle(props) {
    let {id} = useParams()
    const navigate = useNavigate()
    const [isShown, setIsShown] = useState(false)
    const handleClick = () => {
        setIsShown(current => !current)
    }

    const displayPost = (props) => {
        const {post} = props;
        const parsedStorage = JSON.parse(localStorage.user)
        const deletePost = () => {
            axios({
                method: 'delete',
                url: `${serverUrl}/post/${id}`,
                mode: "cors",
                headers: {
                    'Authorization': `token ${parsedStorage.token}`
                }
            })
                .then(res => navigate('/'))
        }
        if (post) {
            return (
                <div className='post' key={post._id}>
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
            {displayPost(props)}
        </>
    )
}