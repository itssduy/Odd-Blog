import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router'
import { useNavigate } from 'react-router';

const Post = ()=>{
    const navigate = useNavigate();
    const [getPost, setPost] = useState({});
    const [getComments, setComments] = useState([]);
    const [getAuthor, setAuthor] = useState('');
    const [getIsAuthor, setIsAuthor] = useState(false);
    const [getCommentText, setCommentText] = useState('');
    const params = useParams();
    const postId = params.postid;

    useEffect(()=>{


        
        (async ()=>{
            const headers = {
                "Content-Type": "application/json",
                "token": localStorage.getItem('blog-token')
            }
            const userURL = `${import.meta.env.VITE_API_URL}/users/`;
            const currentUser = await fetch(userURL, {
                headers: headers
            });
            const userData = await currentUser.json();


            const postUrl = `${import.meta.env.VITE_API_URL}/posts/${postId}`;

            const postResponse = await fetch(postUrl, {
                method: "GET"
            })
            const postData = await postResponse.json();
            setPost(postData)


            const commentUrl = `${import.meta.env.VITE_API_URL}/comments/${postId}`;
            const commentResponse = await fetch(commentUrl, {
                method: "GET"
            })
            const commentData = await commentResponse.json();
            

            const authorUrl = `${import.meta.env.VITE_API_URL}/users/${postData.authorId}`;
            const authorResponse = await fetch(authorUrl, {
                method: "GET"
            })
            const authorData = await authorResponse.json();


            const newCommentdata = commentData.map((x)=>{
                if(x.authorId == authorData.id){
                    x.isAuthor = true;
                }
                return x;
            })
            setComments(newCommentdata)

        if(userData.id == authorData.id) {
            setIsAuthor(true);
        }

            setAuthor(authorData)
        })();

        
    },[postId])



    const createComment = async (e)=>{
        e.preventDefault();

        const headers = {
             "Content-Type": "application/json",
             "token": localStorage.getItem('blog-token')
        }
        const userURL = `${import.meta.env.VITE_API_URL}/users/`;
        const currentUser = await fetch(userURL, {
            headers: headers
        });
        const userData = await currentUser.json();


        const commentUrl = `${import.meta.env.VITE_API_URL}/comments/`;
        const body = {
            postId: postId,
            authorId: userData.id,
            text: getCommentText
        };
        await fetch(commentUrl, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(body),
        })
        navigate(0);
    }

    const deletePost = async ()=>{
        const headers = {
             "token": localStorage.getItem('blog-token')
        }
        const deleteURL = `${import.meta.env.VITE_API_URL}/posts/${postId}`;
        const response = await fetch(deleteURL, {
            method: "DELETE",
            headers: headers,
        });
        console.log(await response.json());
        navigate('/blog/')
    }

    const deleteComment = async (e, commentId)=>{
        const headers = {
             "token": localStorage.getItem('blog-token')
        }
        const deleteURL = `${import.meta.env.VITE_API_URL}/comments/${commentId}`;
        const response = await fetch(deleteURL, {
            method: "DELETE",
            headers: headers,
        });
        console.log(await response.json());
        navigate(0);
    }

    return (
        <>
            <h1>{getPost.title}</h1>
            <h3>By: <Link to={'/blog/users/'+(getAuthor.id || '')}> {getAuthor.username}</Link></h3>
            <p>{getPost.text}</p>

            <h3>Comments</h3>
            <form onSubmit={createComment}>
                <input type="text" name='text' placeholder='Text' onChange={(x)=>{setCommentText(x.target.value)}}/>
                <button type='submit'>Submit</button>
            </form>

            <hr />
            {getComments.map((x)=>{
                return <li key={x.id}>
                        
                        <p><strong>{x.author.username}</strong>: {x.text}</p>
                        <p>Likes: {x.likes}   Dislikes: {x.dislikes}</p>
                        {(getIsAuthor || x.isAuthor) && <button onClick={(e)=>{deleteComment(e, x.id)}}>Delete</button>}
                        <hr />
                    </li>
            })}

            {getIsAuthor && <button onClick={deletePost}>Delete Post</button>}

        </>
    )
}

export default Post