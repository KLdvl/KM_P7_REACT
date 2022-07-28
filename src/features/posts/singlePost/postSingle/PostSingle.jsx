import './postSingle.scss'
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {serverUrl} from "../../../variables/variables";

export function PostSingle(props) {
    let {id} = useParams()
    const navigate = useNavigate()

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
        if(post) {
            return (
                <div className='post' key={post._id}>
                    <h3 className='post__title'>{post.title}</h3>
                    <p className='post__body'>{post.content}</p>
                    <img className="miniature" src={post.imageUrl}/>
                    <div>
                        <button>EDIT</button>
                        <button onClick={deletePost}>DELETE</button>
                        <Link to={"/"}>
                            <button>GO BACK</button>
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