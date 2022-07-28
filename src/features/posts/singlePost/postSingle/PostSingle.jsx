
export function PostSingle(props) {

    const displayPost = (props) => {
        const { menu, post } = props;

        if (post.length > 0) {
            return (
                post.map((post, index) => {
                    return (
                        <div className='post' key={post._id}>
                            <h3 className='post__title'>{post.title}</h3>
                            <p className='post__body'>{post.content}</p>
                            <button>Click to read more</button>
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
            {displayPost(props)}
        </>
    )
}