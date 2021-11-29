import React, { useState,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from "materialize-css"

const Signup = () => {

  const history = useHistory()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState(undefined)
  useEffect (()=>{

    if(url){
      uploadFields()
    }
  },[url])
  const uploadpic = () =>{
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
const uploadFields = () => {

  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    M.toast({ html: "Invalid Email", classes: "red" })
    return
  }
  fetch("/signup", {
    method: "Post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      password,
      email,
      pic:url
    })
  }).then(res => res.json())
    .then(data => {
      if (data.error) {
        M.toast({ html: data.error, classes: "light green" })
      }
      else {
        M.toast({ html: data.message, classes: "green" })
        history.push('/signin')
      }
    }).catch(err => {
      console.log(err)
    })


}

  const PostData = () => {

        if(image){
          uploadpic()
        }
        else
        uploadFields()
  
  }




  return (
    <div className="mycard">
      <div class="card auth-card input-field">
        <h2>Instagram</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}

        />


        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}


        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />

        <div className="file-field input-field">
          <div className="btn #42a5f5 blue  lighten-1">
            <span>upload profile pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>




        <button className="btn waves-effect waves-light #42a5f5 blue brighten-1"
          onClick={() => PostData()}
        >  signup

        </button>
        <h5>
          <Link to="/signin">Already Have an Account ?</Link>
        </h5>


      </div>
    </div>
  )
}


export default Signup


