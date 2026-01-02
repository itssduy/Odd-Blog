import { useEffect, useState } from "react"
import { useParams, Link } from "react-router"

const User = ()=>{
    const [getUsername, setUsername] = useState('');
    const [getPosts, setPosts] = useState([]);
    const [getComments, setComments] = useState([]);

    const params = useParams();
    const userId = params.userId;
    useEffect(()=>{
        const userUrl = `${import.meta.env.VITE_API_URL}/users/${userId}`;
        const postsUrl = `${import.meta.env.VITE_API_URL}/users/${userId}/posts`;
        const commentsUrl = `${import.meta.env.VITE_API_URL}/users/${userId}/comments`;

        (async ()=>{
            const userResponse = await fetch(userUrl);
            const userData = await userResponse.json();
            setUsername(userData.username);

            const postsResponse = await fetch(postsUrl);
            const postsData = await postsResponse.json();
            setPosts(postsData);

            const commentsResponse = await fetch(commentsUrl);
            const commentsData = await commentsResponse.json();
            setComments(commentsData);
            console.log(commentsData)
        })();
    },[userId])

    return (
        <>
            <h1>{getUsername}</h1>

            <div>
                <h2>Posts:</h2>
                <hr />
                {getPosts.map((x)=>{
                    return <li key={x.id}>
                        <Link to={`/blog/${x.id}`}><h4>{x.title}</h4></Link>
                        <p>Likes: {x.likes}   Dislikes: {x.dislikes}</p>
                        <hr />
                        </li>
                })}
            </div>
            <div>
                <h2>Comments:</h2>
                <hr />
                {getComments.map((x)=>{
                    return <li key={x.id}>
                    <Link to={`/blog/${x.post.id}`}><h4>{x.post.title}</h4></Link>

                        <p>{x.text}</p>
                        <p>Likes: {x.likes}   Dislikes: {x.dislikes}</p>
                        <hr />
                    </li>
                })}
            </div>
        </>
    )
}


export default User