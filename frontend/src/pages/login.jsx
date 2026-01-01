import { useState } from "react";
import { useNavigate } from "react-router";

const Login = ()=>{
    const [getUsername, setUsername] = useState('');
    const [getPassword, setPassword] = useState('');

    const navigate = useNavigate();
    const onSubmit = async (e)=>{
        e.preventDefault();

        try {
            const headers = {
                "Content-Type": "application/json"
            }
            const url = `${import.meta.env.VITE_API_URL}/auth/login`
            const body = {
                username: getUsername,
                password: getPassword,
            }
            const response = await fetch(url, {
                headers: headers,
                method: "POST",
                body: JSON.stringify(body)
            })
            const data = await response.json();
            localStorage.setItem("blog-token", data)

            navigate('/blog')
                
        } catch (err) {
            console.log(err);
        }
        

    
    }
    return (
        <>

            <form onSubmit={onSubmit}> 
                <input type="text" name="username" placeholder="Username" onChange={(x)=>{setUsername(x.target.value)}}/>
                <input type="password" name="password" placeholder="password" onChange={(x)=>{setPassword(x.target.value)}}/>

                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Login