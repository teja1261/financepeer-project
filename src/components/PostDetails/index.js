import './index.css'

const PostDetails = props =>{
    const {postData} = props
    const {id, title, body} = postData
    return(
        <div className="postItem-container">
            <h1 className="post-id">{id}</h1>
            <div className="posts">
                <p>{title}</p>
                <p>{body}</p>
            </div>
        </div>
    )
}

export default PostDetails