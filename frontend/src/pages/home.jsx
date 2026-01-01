import { Link } from "react-router"
import { useEffect, useState } from 'react'

const Home = ()=>{
    const [getPosts, setPosts] = useState([]);

    useEffect(()=>{
        try {
            const url = `${import.meta.env.VITE_API_URL}/posts`;
        
            (async ()=> {
                const response = await fetch(url,
                {
                    method: "GET"
                });

                const data = await response.json();


                setPosts(data)
            })();
            
        } catch(err){
            console.log(err)
        }

        
    },[]);

    return (
        <>
            <Link to='create'>Create</Link>
            <ul>
                {getPosts.map((x)=>{
                    return <li key={x.id}> <Link to={x.id}>{x.title}</Link></li>
                })}
            </ul>
            
        </>
    )
}

export default Home