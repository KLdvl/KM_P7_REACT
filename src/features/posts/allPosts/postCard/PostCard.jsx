
export function PostCard(props) {

    const displayPosts = (props) => {
        const { posts } = props;

        if (posts.length > 0) {
            return (
                posts.map((post) => {
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
            {displayPosts(props)}
        </>
    )
}