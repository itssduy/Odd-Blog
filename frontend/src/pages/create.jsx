import { useState } from 'react'

const Create = ()=>{
    const [getTitle, setTitle] = useState('');
    const [getText, setText] = useState('');

    const onSubmit = async (e)=>{
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json",
            "token": localStorage.getItem("blog-token")
        }
        const url = `${import.meta.env.VITE_API_URL}/posts`;
        const body = {
            "title": getTitle,
            "text": getText,
        }
        const response = await fetch(url, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(body)
        })

        const data = await response.json()
        console.log(data)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" name="title" placeholder="Title" onChange={(x)=>{setTitle(x.target.value)}}/>
                <input type="text" name="text" placeholder="Text" onChange={(x)=>{setText(x.target.value)}}/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Create