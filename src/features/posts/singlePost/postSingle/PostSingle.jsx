import './postSingle.scss'

export function PostSingle(props) {
    const displayPost = (props) => {
        const {post} = props;
        if (post) {
            return (
                <div className='post' key={post._id}>
                    <h3 className='post__title'>{post.title}</h3>
                    <p className='post__body'>{post.content}</p>
                    <img className="miniature" src={post.imageUrl}/>
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