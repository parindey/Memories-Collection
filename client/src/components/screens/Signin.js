import React, {useState,useContext,} from 'react';
import { Link,useHistory } from 'react-router-dom';
import { userContext } from '../../App';
import M from 'materialize-css'

const Signin = ()=>{

    const {state,dispatch}= useContext (userContext)
    const history = useHistory()
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const PostData = () => {
     
      
      fetch("/signin", {
        method: "Post",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
        
          password,
          email
        })
      }).then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.error) {
            M.toast({ html: data.error, classes: "light green" })
          }
          else {
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            dispatch({type:"USER",payload:data.user})
            M.toast({ html:"signed in successfully", classes: "green" })
            history.push('/')
          }
        }).catch(err => {
          console.log(err)
        })
    }
  
  
    return(
    <div className = "mycard">
      <div class="card auth-card input-field">
        <h2>Instagram</h2>
     
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

       <button className="btn waves-effect waves-light #42a5f5 blue brighten-1"
       onClick ={()=>PostData()}
       >Login
    
  </button>
  <h5>
      <Link to="/signup">Don't Have an Account ?</Link>
  </h5>

       </div>
    </div>
    )
}

export default Signin


