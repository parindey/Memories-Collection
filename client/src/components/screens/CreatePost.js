
import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import M from 'materialize-css'




const CreatePost = () =>{
  const history =useHistory()
  const [title,setTitle]= useState("")
  const [body,setBody]=useState("")
  const [image,setImage]=useState("")
  const [url,setUrl]=useState("")


  useEffect(()=>{
    if(url){
    fetch("/createpost", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        "AuthoriZation":"Bearer "+ localStorage.getItem("jwt")
      },
      body: JSON.stringify({
      
        title,
        body,
        pic:url
      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "light green" })
        }
        else {
          M.toast({ html:"uploaded successfully", classes: "green" })
          history.push('/')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },[url])
  


  const postDetails =() =>{
    const data =new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","parindey")
    fetch("https://api.cloudinary.com/v1_1/parindey/image/upload",{
      method:"post",
      body:data
    })
    .then(res=> res.json())
    .then(data=>{
      setUrl(data.url)
    })
    .catch(err=>{
      console.log(err)
    })



  
  }
    return(
    <div className="card input-field"
        style={{
            margin:"50px auto",
            padding:"20px",
            maxWidth:"500px",
            textAlign: "center"
        }}>
         <input type="text" 
         placeholder="title"
         value={title}
         onChange={(e)=>setTitle(e.target.value)}
         />
         <input type="text"
          placeholder="body"
          value={body}
         onChange={(e)=>setBody(e.target.value)}
         />
         <div className="file-field input-field">
      <div className="btn #42a5f5 blue  lighten-1">
        <span>upload pic</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}
        />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <button className="btn waves-effect waves-light #42a5f5 blue lighten-1"
    onClick={()=>postDetails()}
    
    
    
    >Submit Post
    
    </button>

    </div>

    )
}

 export default CreatePost

 