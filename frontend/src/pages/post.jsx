import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router'
import { useNavigate } from 'react-router';

const Post = ()=>{
    const navigate = useNavigate();
    const [getPost, setPost] = useState({});
    const [getComments, setComments] = useState([]);
    const [getAuthor, setAuthor] = useState('');
    const [getCommentText, setCommentText] = useState('');
    const params = useParams();
    const postId = params.postid;

    useEffect(()=>{


        
        (async ()=>{
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
            setComments(commentData)

            const authorUrl = `${import.meta.env.VITE_API_URL}/users/${postData.authorId}`;
            const authorResponse = await fetch(authorUrl, {
                method: "GET"
            })
            const authorData = await authorResponse.json();
            setAuthor(authorData)
        })();

        
    },[])



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
                        Anonymous
                        <p>{x.text}</p>
                        <p>Likes: {x.likes}   Dislikes: {x.dislikes}</p>
                        <hr />
                    </li>
            })}


        </>
    )
}

export default Post