import {Component} from 'react';

import Header from '../Header'
import PostDetails from '../PostDetails'

import './index.css'

class PostsRoute extends Component {
    state = {postData: [{
        id: 0,
        userId: 0,
        title: 'FullStack Developer',
        body: "All i do is developing"
    }]}

    componentDidMount(){
        this.renderUserID();
    }

    renderUserID  = async () =>{
        const response = await fetch("http://localhost:6003/posts");
        let data = []
        if(response.ok === true){
            data =await response.json();
            const formatedData = data.map( item =>({
                id: item.id,
                userId: item.userId,
                title: item.title,
                body: item.body,
            }))
            this.setState({postData: formatedData,isLoading: false});
        }
    }

    render() {
        const {postData} = this.state;

        return (
            <>
                <Header />
                <div className="blog-list-container">
                    {postData.map(item => <PostDetails postData={item} key={item.id} />)}
                </div>
            </>
        )
    }
}

export default PostsRoute