import {Link} from 'react-router-dom';
import './postCard.scss';

export function PostCard({posts}) {

    const displayPosts = (posts) => {

        if (posts.length > 0) {
            return (
                posts.map((post) => {
                    return (
                        <div className='post' key={post._id}>
                            <h3 className='post__title'>{post.title}</h3>
                            <p className='post__body'>{post.content}</p>
                            <img className="miniature" src={post.imageUrl} alt="post"/>
                            <Link to={post._id}>
                                <button>Click to read more</button>
                            </Link>
                        </div>
                    )
                })
            )
        } else {
            return (<h3>No posts yet</h3>)
        }
    }

    return (
        <>
            {displayPosts(posts)}
        </>
    )
}