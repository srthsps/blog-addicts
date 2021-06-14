
import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Helmet} from 'react-helmet'

const App = () => {

    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url,setUrl] = useState('')
    const [blogs,setBlogs] = useState([])
    let [count,setCount] = useState(0) 



    useEffect(()=>{
        axios.get('http://localhost:3003/api/blogs').then(res=>{
            setBlogs(res.data)
        })

    },[count])

    const addBlog =async()=>{

        const blogObject = {
            "title" : title,
            "author" : author,
            "url": url
        }
        const res = await axios.post('http://localhost:3003/api/blogs',blogObject)
            setBlogs(blogs.concat(res))
            console.log(blogs);
            setAuthor('')
            setTitle('')
            setUrl('')
            setCount(count+1)
        
        
        
        
    }

    const deleteData= (id)=>{
        const blogId=id
        axios.delete('http://localhost:3003/api/blogs',{data:{blogId}}).then(res=>{
            console.log("deleted");
        })
        setCount(count+1)
    }


    return (
        <div>
            <div className="App">
            <h1>Blog Addicts</h1>
            <Helmet>
                <style>
                    {'body { background-image: url(https://images.ctfassets.net/usf1vwtuqyxm/6wHncCI874vqZMgEeZUOLk/3f086d8665f06dfa1f9f0af585850d47/UOR_DiagonAlley_VB.jpg); background-position:center center; background-repeat:no-repeat; background-attachment:fixed; background-size:cover }'
                      }</style>
            </Helmet>
            <span className="subhead">Enter the blog details</span>
            <input type="text" value={title} placeholder="Enter the title" onChange={(event)=>{
                setTitle(event.target.value)
            }}/>
            <input type ="text" value={author} placeholder="Enter author name" onChange={(event)=>{
                setAuthor(event.target.value)
            }}/>
            <input type = "text" value={url} placeholder="Enter the url" onChange={(event)=>{
                setUrl(event.target.value)
            }}/>
            <button className="addButton" onClick={addBlog}>Add</button>
            <br/>
            </div>
            <div className="blogOutput">
            {blogs.map((b)=>
            
                <div className="blogElement">
                    <div className="buttonDiv">
                <Button id={b.id} del = {deleteData}/>
                </div>
                <p className="blogTitle">{b.title}</p>
                <p><b>Author: </b>{b.author}</p>
                <p>{b.url}</p>
                
            </div>
            
            
            )}

        </div>
        </div>

       
    )
}

const Button=({id,del})=>{
    return(
    <button className="deleteBtn"  onClick={()=>{del(id)}}>delete</button>
    )}

export default App
